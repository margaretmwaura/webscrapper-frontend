<script setup>
import { ref, computed, watchEffect, onMounted , onUpdated} from 'vue';
import { useNow } from '@vueuse/core'

let timeRef = ref(null)

let cells = ref((24 * 7 * 12))

const now = useNow()
let curr = new Date()
let currentDate = ref(curr.getDate())

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

let height = '20px'

let week = []
let days = []

const dates = (startDate, num) => Array.from(
  { length: num },
  (_, i) => new Date(startDate.getTime() + (i * 60000 * 60 * 24)).toISOString().slice(0, 10)
);

const lastWeek = () => {
  let date = new Date();
  date.setDate(date.getDate() - date.getDay() - 6);
  return dates(date, 7);
}

const thisWeek = () => {
  let date = new Date();
  date.setDate(date.getDate() - date.getDay() + 1);
  return dates(date, 7);
}

const nextWeek = () => {
  let date = new Date();
  date.setDate(date.getDate() - date.getDay() + 8);
  return dates(date, 7);
}

let current_w = thisWeek();

const display_d = days.concat(current_w)

for (let i = 0 ; i < 7; i++) {
  let date = {}
  let data = display_d[i]
  let day = new Date(data).toDateString().split(' ')
  date.day = day[0]
  date.date = day[2]
  week.push(date)
}

const isCurrentDay = (day) => {
  return day == currentDate.value
}

// onUpdated(() => {
//   timeRef.value[currentHour.value].scrollIntoView({ behavior: "smooth"});
// })

onMounted(() => {
  timeRef.value[currentHour.value].scrollIntoView({ behavior: "smooth"});
})

</script>




<template>
<!-- https://dev.to/yinon/a-css-grid-week-s-view-calendar-overlapping-scheduled-events-2f80 -->
<!-- https://css-tricks.com/building-a-conference-schedule-with-css-grid/ -->
<!-- There is a thought of using 2d to display a multidimensional array in this case a 2 day array -->
<!-- TODO:-->
<!-- 1. Yet to understand is the span property in the css (done)-->
<!-- FIXME: -->
<!-- 1. The days should be dynamic (done) -- compare with teams-->
<!-- 2. The time should be dynamic (done) -->
<!-- 3. The grid generation should be dynamic (done)-->
<!-- 4. Allow for the width to be scrollable (done)-->
<!-- 5. Show an indicator at the current time -->
<!-- 6. Show an indicator at the current date -->
<!-- 7. Buttons to go forward or backwards for dates (done) -->
<!-- 8. Borders within the time and date grid (done)-->
<!-- 9. When the body of the calendar is quite far away from the top the calendar is still visible beneath the sticky header -->
  <div class="z-999">
    <div class="block md:hidden">
      <p>Our list will go in here</p>
    </div>
    <div class="hidden md:grid w-full main">
        <ol class="headline" >
          <li v-for="day in week" :key="day">
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
          <li v-for="i in 24" :key="i" ref="timeRef">
            <time>{{ (i - 1).toString().padStart(2, "0") }} <span> {{ i <= 12 ? 'am' : 'pm' }}</span></time>
          </li>
        </ol>
        <ol  class="calendar">
          <li v-for="cell in cells" :key="cell">
          </li>
          <section class="current_time" />
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
  text-align: center;
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
  background-color: #e1e2e680;
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
  background-color: #e1e2e680;
  position: sticky;
  top: 0;

  .current_day {
    background-color: paleturquoise;
    border-radius: 12px;
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
    background-color: white;
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
  background-color: #d6219c;
  border-radius: 3.64752px;
  --indent: calc(var(--overlap-count, 0) * 8px);
  margin: 1px 1px 1px -20px
}

.current_time::after {
    width : 60px;
    height: v-bind('height');
    // https://github.com/vuejs/core/issues/4880
    // counter-reset: hour v-bind('currentHour') minutes v-bind('currentMinutes');
    // content: counter(hour) ":" counter(minutes);
    content: v-bind('display_time');
    color: white;
    font-size: 12px;
    background-color: #d6219c;
    position: absolute;
    border-radius: 75%;
    margin-top: -7px;
    margin-left: -53vw;
}

.task {
  grid-column: var(--column);
  grid-row: var(--row);
  background-color: var(--color);
  border-radius: 3.64752px;
  width: 100%;
  --indent: calc(var(--overlap-count, 0) * 8px);
  margin: 1px 1px 1px calc(1px + var(--indent));
}


</style>