// console.log('takeoff');

// setTimeout(() => {
//     console.log('land');
// },5000);

const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

(async () => {
  console.log('スタート');
  await sleep(1000);
  console.log('1秒経ってる!')
})();