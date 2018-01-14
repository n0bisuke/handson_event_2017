// const g = () => {
//    console.log(123);
// }

// const g = (c) => {
//     if(c > 10)return
//     console.log(c)
//     g(++c);
// }

// g(1);

// console.log(Math.max(1,2,3));

// function f(c,b,d,f){
//     console.log(c,b,d,f)
// }

// f(1,2,3,4,5,6)


// const bruce = { 名前: "ブルース" };
// function update(birthYear, occupation) { 
//     this.生年 = birthYear;
//     this.職業 = occupation;
// }
// const updateBruce1949 = update.bind(bruce, undefined, "作詞家");
// console.log(bruce); // { '名前': 'ブルース' }
// // updateBruce1949(" 作詞家 ");
// updateBruce1949(1999);
// console.log(bruce); // { '名前': 'ブルース', '生年': 1949, '職業': '作詞家' }


// const hoge = ()=>{
//     return this;
// }

// const x = hoge.call(2);
// console.log(x());

// const hoge = () => {
//     return this;
// }

// const x = hoge.bind(2);
// console.log(x());