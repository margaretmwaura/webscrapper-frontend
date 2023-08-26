<script setup>
import { ref, computed, watchEffect, onMounted } from 'vue';


defineProps({
  msg: String,
});

let cells = ref((24 * 7))

let curr = new Date()
let currentHour = ref(curr.getHours())
let currentDate = ref(curr.getDate())
let week = []

for (let i = 1; i <= 7; i++) {
  let date = {}
  let first = curr.getDate() - curr.getDay() + i 
  let day = new Date(curr.setDate(first)).toDateString().split(' ')
  date.day = day[0]
  date.date = day[2]
  week.push(date)
}

console.log(week)

</script>




<template>
<!-- https://dev.to/yinon/a-css-grid-week-s-view-calendar-overlapping-scheduled-events-2f80 -->
<!-- https://css-tricks.com/building-a-conference-schedule-with-css-grid/ -->
<!-- There is a thought of using 2d to display a multidimensional array in this case a 2 day array -->
<!-- TODO:-->
<!-- 1. Yet to understand is the span property in the css -->
<!-- FIXME: -->
<!-- 1. The days should be dynamic (done) -- compare with teams-->
<!-- 2. The time should be dynamic (done) -->
<!-- 3. The grid generation should be dynamic (done)-->
<!-- 4. Allow for the width to be scrollable -->
<!-- 5. Show an indicator at the current time -->
<!-- 6. Show an indicator at the current date -->
<!-- 7. Buttons to go forward or backwards for dates -->
<!-- 8. Borders within the time and date grid -->
<div class="container">
    <ol class="headline" >
      <li v-for="day in week" :key="day">
          {{day.day}} 
          <br>
          <span> {{day.date}}  </span>
      </li>
    </ol>
    <ol class="time">
      <li v-for="i in 24" :key="i">
        <time>{{i - 1 }} <span> {{ i <= 12 ? 'am' : 'pm' }}</span></time>
      </li>
    </ol>
    <ol  class="calendar">
      <li v-for="cell in cells" :key="cell">
      </li>
      <!-- <section class="task task-1" style="--column: 1; --row: 9 / span 24; --color: #4cc3d2;"> </section>  -->
        <section class="task" style="--column: 1 ; --row: 12 / span 4; --color: #d6219c;"> </section> 
        <!-- <section class="task" style="--column: 4; --row: 13 / span 10; --color: #b779ff;"></section>
        <section class="task" style="--column: 1; --row: 13 / span 32; --color: #b779ff;--overlap-count: 2;"></section>
        <section class="task" style="--column: 1; --row: 15 / span 8; --color: #d6219c;--overlap-count: 1;"></section>  -->
    </ol>
</div>


</template>

<style scoped lang="scss">
ol {
  list-style: none;
  margin: 0;
  padding: 0;
  text-align: center;
}

// The fraction here controls how many times we divide an hour
$fraction: 1;
$total-rows: 24;
$total-columns: 7;

.container {
  // FIXME: The width should be set in a way it allows for scrolling
  width: 100%;
  margin: auto;
  display: grid;
  grid-template-columns: min-content auto;
  overflow: scroll;
  grid-template-areas:
    ". headline"
    "time calendar";
}

ol.time {
  grid-area: time;
  display: grid;
  grid-template-rows: repeat($total-rows, 1fr);
  background-color: #e1e2e6;
  > li {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    border-bottom-width: 1px;
    border-top-width: 1px;
    border-color: #DCDCDC;
    padding-left: 6px;
    padding-right: 6px;
    > time {
      line-height: 1;
      font-size: small;
      white-space: nowrap;
      text-transform: uppercase;
    }
  }
}

ol.headline {
  margin-top: 20px;
  grid-area: headline;
  display: grid;
  padding-top: 4px;
  padding-bottom: 4px;
  grid-template-columns: repeat($total-columns, 1fr);
  background-color: #e1e2e6;
  > li {
    font-weight: bolder;
    border-right-width: 1px;
    border-left-width: 1px;
    border-color: #DCDCDC;
    > span {
        // text-transform: uppercase;
        font-weight: normal;
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
  border-radius: 3.64752px;
  overflow: hidden;
  > li {
    // FIXME: The height is controlling the height of the one cell in the calendar
    height: 100px;
    grid-column: var(--column);
    grid-row: var(--row);
    background-color: white;
  }

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

.task {
  grid-column: var(--column);
  grid-row: var(--row);
  background-color: var(--color);
  border-radius: 3.64752px;
  // width: 90%;
  --indent: calc(var(--overlap-count, 0) * 8px);
  margin: 1px 1px 1px calc(1px + var(--indent));
}

</style>