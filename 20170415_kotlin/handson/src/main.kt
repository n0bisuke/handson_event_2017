/**
 * Created by n0bisuke on 2017/04/15.
 */

package sample

//class Person(val name: String)

class IntPair(val first: Int, val second: Int){
    fun sum():Int{
        return first + second
    }

    fun max():Int{
        return when {
            first > second -> first
            else -> second
        }
    }

    fun swap(): IntPair{
        return IntPair(second,first)
    }
}

fun Int.meet(a: Int): IntPair{
    return IntPair(this,a)
}

/*
fun add(a: Int, b: Int): Int{
    return a + b
}

fun square(a: Int):Int{
    return a * a
}

fun max(a: Int, b: Int):Int{
    return when {
        a > b -> a
        else -> b
    }
}

fun isEven(a: Int):Boolean{
    return when {
        a % 2 == 0 -> true
        else -> false
    }
}

fun factorial(a: Int):Int{
    var result = 1
    for(i in 1..a) result *= i
    return result
}
*/

fun main(args: Array<String>) {
    val x: IntPair = IntPair(2,4)
    println(x.sum())
    println(x.max())
    val y: IntPair = x.swap()
    println(y.first)
    println(y.second)

    val got = 2.meet(3)
    println(got.first)  //=> 2
    println(got.second) //=> 3
//    val x = factorial(5)
//    println(x)

//    val taro: Person = Person("Taro")
//    println(taro.name) //=> Taro
}

/**
fun main(args: Array<String>) {
    println("Hello world!")
    println(123)
    println(123.4)
    println(true)
    println('A')
    println("hello")

    val userName: String = "たろう"
    val userAge: Int = 28
    println("${userName}さんは${userAge}才です。")

//    val score = 65
//    if (score >= 60) {
//        println("合格")
//    } else {
//        println("失格")
//    }

//    val score = 65
//    val message = if (score >= 60) {
//        "合格だよ〜ん"
//    } else {
//        "残念、失格"
//    }
//    println(message)

//    var str: String = ""
//    for(i in 1..100) {
//        if(i % 3 == 0){
//            str += "Fizz"
//        }
//        if(i % 5 == 0){
//            str += "Buzz"
//        }
//        println("${i}:${str}")
//        str = ""
//    }

    for(i in 1..100) {
        val str = when {
            i % 15 == 0 -> "FizzBuzz"
            i % 3 == 0 -> "Fizz"
            i % 5 == 0 -> "Buzz"
            else -> i
        }
        println(str)
//        str = ""
    }
}
*/