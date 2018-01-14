const wait = (delay) => {
  return new Promise(resolve => setTimeout(resolve, delay));
}

async function tryWaitFunction () {
  console.log('スタート')
  await wait(1000);
  console.log('途中')
  await wait(1000);
  console.log('終わり')
}

tryWaitFunction();