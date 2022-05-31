let Calculate = (obj) => {
    let sum =0;
    let t=obj.length
    
    for(let i of obj){
        sum+=parseFloat(i["Amount"])
    }

    let singleExpend = parseFloat(sum/t)

    let taker = []
    let giver = []

    for(let i of obj){
        if((i["Amount"]-singleExpend)>0){
            let k = {Name : i["Name"],Amount :(i["Amount"]-singleExpend)}
            taker.push(k)
            // console.log("taken",i["Name"],i["Amount"],k)
        }
        else{
            let k={Name : i["Name"],Amount :(singleExpend-i["Amount"])}
            giver.push(k)
            // console.log("given",i["Name"],i["Amount"],k)
        }
    }    
    // console.log(sum,sum/t,t,giver,taker)
    console.log(giver,taker)

    let results = []

    while(taker.length !==0 && giver.length !==0 ){
            if(giver[0]["Amount"]<taker[0]["Amount"]){
                results.push({
                    giver : giver[0]["Name"],
                    amount : giver[0]["Amount"],
                    taker : taker[0]["Name"]
                })

                taker[0]["Amount"] = Math.round(taker[0]["Amount"]-giver[0]["Amount"])
                giver.shift()
            }
            else if(giver[0]["Amount"]===taker[0]["Amount"]){
                results.push({
                    giver : giver[0]["Name"],
                    amount : giver[0]["Amount"],
                    taker : taker[0]["Name"]
                })

                giver.shift()
                taker.shift()
            }
            else{
                results.push({
                        giver : giver[0]["Name"],
                        amount : taker[0]["Amount"],
                        taker : taker[0]["Name"]
                })
                giver[0]["Amount"]=Math.round(giver[0]["Amount"]-taker[0]["Amount"])
                taker.shift()
            }
    }
    // console.log("1111",results)

    return results
}

export default Calculate