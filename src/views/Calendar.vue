<script setup>
import { ref, computed, watch, onMounted , onUpdated} from 'vue';
import CalendarItem from '../components/calendar/CalendarItem.vue'
import { useNow } from '@vueuse/core'
import { useTodoListStore } from './../stores/todoListStore'
import { storeToRefs } from 'pinia';
import colors from 'tailwindcss/colors'
import moment from 'moment';
import { useTodoListManagement } from './../composables/useTodoListManagement'

const store = useTodoListStore()
const {getCurrentWeekTodoList } = useTodoListManagement()
let { currentWeekTodoList, todoList } = storeToRefs(store);

const cells = ref((24 * 7 * 12))
let now = useNow()
let curr = new Date()

let timeRef = ref(null)
let days = ref([])
let currentDate = ref(curr.getDate())
let current_w = ref([])
let isNextWeek = ref(false)

let currentHour = computed(() => {
  return now.value.getHours()
})
let currentMinutes = computed(() => {
  return now.value.getMinutes()
})
let currentHourIndicator = computed(() => {return((currentHour.value) * 12 + 1) + Math.floor(0.2 * currentMinutes.value)})
let display_time = computed (() => {
  return `"` + `${currentHour.value}` + ":" + `${currentMinutes.value.toString().padStart(2, "0")}` + `"`
})
let currentWeekHasCurrentDay = ref(false)

watch(current_w, async (new_current_w) => {
   if(!new_current_w || new_current_w.length == 0){
    return;
   }
   await getWeeklyToDoList(current_w.value[0], current_w.value[6]);
   await populateDaysOfTheWeek(new_current_w)
   currentWeekHasCurrentDay.value = new_current_w[6] == curr.toISOString().split('T')[0] ? true : false
   isNextWeek.value = curr.toISOString().split('T')[0] == new_current_w[6] ? false : true;
});

watch(todoList, (updatedTodoList) => {
  console.log("todolist has been updated")
  console.log(updatedTodoList)
  store.updateCurrentWeekToDoList()
  //https://stackoverflow.com/questions/37585309/replacing-objects-in-array
})

const thisWeek = () => {
  current_w.value = [...Array(7)].map((_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - i)
    return d.toISOString().split('T')[0]
  }).reverse()
}

const populateDaysOfTheWeek = async (new_current_w) => {
  days.value = []
  for (let i = 0 ; i < 7; i++) {
    let date = {}
    let instance_date = new_current_w[i]
    let formatted_date = new Date(instance_date).toDateString().split(' ')
    date.day = formatted_date[0]
    date.date = formatted_date[2]
    days.value.push(date)
  }
}

async function getWeeklyToDoList(start_date, end_date){
  await getCurrentWeekTodoList(start_date, end_date)  
}

const getColumnLocation = (item) => {
  let date = new Date(item.reminder)

  // Get year, month, and day part from the date
  var year = date.toLocaleString("default", { year: "numeric" });
  var month = date.toLocaleString("default", { month: "2-digit" });
  var day = date.toLocaleString("default", { day: "2-digit" });

  // Generate yyyy-mm-dd date string
  var formattedDate = year + "-" + month + "-" + day;
  return (current_w.value.indexOf(formattedDate) + 1);
}

const getRowLocation = (item) => {
  let minutes = new Date(item.reminder).getMinutes()
  let hour = new Date(item.reminder).getHours()
  return ((hour) * 12 + 1) + Math.floor(0.2 * minutes);
}

const setBackGroundItemColor = (item) => {
  let status = item.status_name
  let item_hour = new Date(item.reminder).getHours()
  let item_day = new Date(item.reminder).toDateString().split(' ')[2]

  if((item_hour) == currentHour.value && item_day == currentDate.value){
    return colors.indigo[500]
  }
  if(status == 'not-started'){
    return colors.red[100]
  }
  if(status == 'in-progress'){
    return colors.yellow[100]
  }
  if(status == 'closed'){
    return colors.green[100]
  }
}

const setBorderItemColor = (item) => {
  let status = item.status_name
  let item_hour = new Date(item.reminder).getHours()
  let item_day = new Date(item.reminder).toDateString().split(' ')[2]

  if((item_hour) == currentHour.value && item_day == currentDate.value){
    return colors.blue[300]
  }
  if(status == 'not-started'){
    return colors.red[300]
  }
  if(status == 'in-progress'){
    return colors.yellow[300]
  }
  if(status == 'closed'){
    return colors.green[300]
  }
}

const setTextColor = (item) => {
  let item_hour = new Date(item.reminder).getHours()
  let item_day = new Date(item.reminder).toDateString().split(' ')[2]

  if((item_hour) == currentHour.value && item_day == currentDate.value){
    return colors.white
  }else{
    return colors.black
  }
}

const lastWeek = () => {
  let start_date = current_w.value[0]
  current_w.value= [...Array(7)].map((_, i) => {
    const d = new Date(start_date)
    d.setDate(d.getDate() - (i))
    return d.toISOString().split('T')[0]
    }).reverse()
}

const nextWeek = () => {
  let start_date = current_w.value[6]
  current_w.value = [...Array(7)].map((_, i) => {
    const d = new Date(start_date)
    d.setDate(d.getDate() + (i))
    return d.toISOString().split('T')[0]
  })
}

let isCurrentDay = (day) => {
  if(currentWeekHasCurrentDay.value){
    return day == currentDate.value
  }
  return false
}

onMounted(async () => {
  timeRef.value[currentHour.value].scrollIntoView({ behavior: "smooth", block: "center"});
  thisWeek()
})

</script>

<template>
<!-- https://dev.to/yinon/a-css-grid-week-s-view-calendar-overlapping-scheduled-events-2f80 -->
<!-- https://css-tricks.com/building-a-conference-schedule-with-css-grid/ -->
<!-- FIXME: -->
<!-- 7. Buttons to go forward or backwards for dates -->
<!-- 9. When the body of the calendar is quite far away from the top the calendar is still visible beneath the sticky header -->
  <div class="w-full">
    <div class="flex flex-col w-full ml-10 mt-10">
        <p class="text-2xl font-semibold">Calendar <font-awesome-icon icon="fa-regular fa-calendar" size="sm"/></p>
        <hr>
        <div class="flex flex-row mt-4 space-x-4 mb-4">
          <div class="border border-slate-300 rounded-full py-2 px-2">
            <font-awesome-icon icon="fa-solid fa-list" size="lg"/>
          </div>
          <div class="border border-slate-300 rounded-full">
            <p class="font-light pt-2 px-2"> <font-awesome-icon icon="fa-regular fa-clock" size="sm"/> 
              {{ curr.toDateString() }} {{display_time.replaceAll('"', '')}}
            </p>
          </div>
          <button class="bg-indigo-500 border border-indigo-600 py-2 px-2 rounded-full w-32 text-white text-sm" @click="lastWeek">
            <font-awesome-icon icon="fa-solid fa-chevron-left" size="sm"/>
            Last week
          </button>
          <button class="bg-transparent border border-indigo-600 py-2 px-2 rounded-full w-28 text-sm">
            <font-awesome-icon icon="fa-solid fa-download" size="sm"/>
             Export
          </button>
           <button class="bg-indigo-500 border border-indigo-600 py-2 px-2 rounded-full w-32 text-white text-sm" 
           @click="nextWeek" v-show="isNextWeek">
             Next week
            <font-awesome-icon icon="fa-solid fa-chevron-right" size="sm"/>
          </button>
        </div>
        <hr>
    </div>
    <div class="block md:hidden">
      <p>Under Development</p>
    </div>
    <div class="hidden md:grid w-full main">
        <ol class="headline" >
          <li v-for="day in days" :key="day">
            <p :class="{ current_day: isCurrentDay(day.date) }"> 
              {{day.day}} 
              <br>
              <span> {{day.date}}  </span>
            </p>
          </li>
        </ol>
        <div class="button">
        </div>
        <ol class="time">
          <li v-for="i in 24" :key="i" ref="timeRef" :id="i">
            <time>{{ (i - 1).toString().padStart(2, "0") }} <span> {{ i <= 12 ? 'am' : 'pm' }}</span></time>
          </li>
        </ol>
        <ol  class="calendar">
          <li v-for="cell in cells" :key="cell">
          </li>
          <section class="current_time"/>
          <section class="item"
            :style="{
              '--column' : getColumnLocation(todoListitem),
              '--row': getRowLocation(todoListitem),
              '--bg-color': setBackGroundItemColor(todoListitem),
              '--border-color': setBorderItemColor(todoListitem),
              '--text-color': setTextColor(todoListitem),
              '--z-index': index
            }"
            v-for="(todoListitem, index) in currentWeekTodoList" :key="todoListitem">
              <CalendarItem :todoListitem="todoListitem" />
          </section>
        </ol>
    </div>
  </div>

</template>

<style scoped lang="scss">

// https://css-tricks.com/almanac/properties/b/box-shadow/#:~:text=That%20syntax%20is%3A,the%20left%20of%20the%20box.
// NOTE: So that the grid lines can align do not set the height or the width on the calendar set it on the headers and time
ol {
  list-style: none;
  margin: 0;
  padding: 0;
  // text-align: center;
}

// The fraction here controls how many times we divide an hour
$fraction: 12;
$total-rows: 24;
$total-columns: 7;

.main {
  // FIXME: The width should be set in a way it allows for scrolling
  grid-template-columns: min-content auto;
  grid-template-areas:
    ". headline"
    "time calendar";
  margin-top: 20px;
}

.button{
  background-color: theme("colors.zinc.200");
  justify-content: center;
  display: flex;
  align-items: center;
  box-shadow:  -6px -4px 4px -4px rgba(0, 0, 0, 0.25); 
  position: sticky;
  top: 0;
  margin-top: 20px;
  margin-left: 20px;
}

ol.headline {
  margin-top: 20px;
  grid-area: headline;
  display: grid;
  padding-top: 4px;
  padding-bottom: 4px;
  grid-template-columns: repeat($total-columns, 1fr);
  box-shadow: 0px 0 3.64752px rgba(0, 0, 0, 0.25);
  background-color: theme("colors.zinc.200");
  position: sticky;
  top: 0;
  text-align: center;
  z-index: 100;

  .current_day {
    background-color: theme("colors.indigo.500");
    border-radius: 12px;
    color: white;
  }

  > li {
    border-right-width: 1px;
    border-left-width: 1px;
    border-color: #DCDCDC;
    width: 200px;
    justify-content: center;
    display: flex;
    align-items: center;
    > p {
      font-weight: bolder;
      padding: 10px 40px 10px 40px;
      > span {
          // text-transform: uppercase;
          font-weight: normal;
      }
    }
   
  }
}

ol.time {
  grid-area: time;
  display: grid;
  margin-left: 20px;
  grid-template-rows: repeat($total-rows, 1fr);
  background-color: #e1e2e620;
  box-shadow: 6px 0 4px -4px rgba(0, 0, 0, 0.25), -6px 0 4px -4px rgba(0, 0, 0, 0.25); 
  > li {
    display: flex;
    // align-items: flex-end;
    justify-content: flex-end;
    border-color: #DCDCDC;
    padding-left: 10px;
    padding-right: 10px;
    height: 100px;
    width: 80px;
    > time {
      line-height: 1;
      font-size: small;
      white-space: nowrap;
      text-transform: uppercase;
    }
  }
}

ol.calendar {
  grid-area: calendar;
  display: grid;
  gap: 1px;
  grid-template: repeat($total-rows * $fraction, 1fr) / repeat(
    $total-columns,
    1fr
  );
  grid-auto-flow: column;
  background-color: #e1e2e6;
  box-shadow: 0px 0 3.64752px rgba(0, 0, 0, 0.25);

  > li {
    // FIXME: The height is controlling the height of the one cell in the calendar
    grid-column: var(--column);
    grid-row: var(--row);
    background-color: theme('colors.zinc.100');
  }


  // FIXME: This is to be used if we divide a row by 4; setting the fraction to be 4
  @for $i from 1 through $total-rows {
    $current-row: $i * $fraction - $fraction + 1;
    li:nth-child(#{$total-rows}n + #{$i}) {
      --row: #{$current-row} / span #{$fraction};
    }
  }

  $sum: $total-rows * $total-columns;
  $next: 1;
  @for $i from 1 through $total-columns {
    $sum: $sum - $total-rows + 1;
    li:nth-child(1n + #{$next}):nth-last-child(1n + #{$sum}) {
      --column: #{$i};
    }
    $next: $next + $total-rows;
  }
}

.current_time {
  grid-row: v-bind('currentHourIndicator');
  grid-column: 1 / span 7;
  background-color: theme("colors.indigo.500");
  border-radius: 3.64752px;
  --indent: calc(var(--overlap-count, 0) * 8px);
  margin: 1px 1px 1px -20px;
  text-align: center
}

.current_time::after {
  width : 60px;
  height: 30px;
  // https://github.com/vuejs/core/issues/4880
  // counter-reset: hour v-bind('currentHour') minutes v-bind('currentMinutes');
  // content: counter(hour) ":" counter(minutes);
  content: v-bind('display_time');
  color: white;
  font-size: 13px;
  background-color: theme("colors.indigo.500");
  position: absolute;
  border-radius: 25px;
  margin-top: -10px;
  margin-left: -53vw;
  padding-top: 4px;
}

.item {
  grid-column: var(--column);
  grid-row: var(--row) / span 12 ;
  background-color: var(--bg-color);
  border-width: 1px;
  border-color: var(--border-color);
  border-radius: 3.64752px;
  width: 90%;
  padding: 10px;
  height: 140px;
  color: var(--text-color);
  p {
    font-size: 14px;
  }
  z-index: var(--z-index);
  --indent: calc(var(--z-index, 0) * 8px);
  margin: 1px 1px 1px calc(1px + var(--indent));
}


</style>