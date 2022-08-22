let simplifyExpense = (obj) => {
  let temp = {};

  for (let i of obj) {
    for (let j of i) {
      const giver = j["giver"];
      const taker = j["taker"];
      const amount = j["amount"];

      // console.log(giver,taker,amount)
      if (temp[giver]) {
        temp[giver] = { ...temp[giver], [taker]: amount };
      } else if (temp[taker]) {
        let temp1 = temp[taker];
        let tempAmount;
        if (temp[taker][giver]) {
          tempAmount = parseInt(temp[taker][giver]) - parseInt(amount);
          // console.log(">>>",tempAmount,temp[taker][giver],amount)
          temp[taker] = { [giver]: tempAmount };
        } else {
          temp[taker] = { ...temp[taker], [giver]: amount * -1 };
        }
      } else temp[giver] = { [taker]: amount };
    }
  }
  // console.log(temp)

  let result = [];

  for (let i in temp) {
    // console.log(temp[i])
    let ans = i + " ";
    for (let j in temp[i]) {
      const temp2 = temp[i];
      // console.log(">>?>?",temp2)
      if (temp2[j] > 0) {
        ans = ans + "to give " + temp2[j] + " to " + j + ", ";
      } else if (temp2[j] < 0) {
        ans = ans + "own " + temp2[j] * -1 + " from " + j + ", ";
      }
      // console.log(ans)
    }
    result.push(ans);
  }

  return { temp, result };
};

export default simplifyExpense;
