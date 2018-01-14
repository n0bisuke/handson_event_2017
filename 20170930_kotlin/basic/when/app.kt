fun main(args:Array<String>){
    val word = "one"
    val num = when(word){
        "zero" -> 0
        "one" -> 1
        "two" -> 2
        else -> -1
    }
    println(num)
}
