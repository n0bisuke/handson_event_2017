extern crate rustc_serialize;
use rustc_serialize::json;

#[macro_use] extern crate nickel;
use nickel::{Nickel, HttpRouter, JsonBody};
use std::collections::HashMap;

// struct Person {
//     events: String
// }
// pub struct Events {
//     data_int: u8,
//     data_str: String,
//     data_vector: Vec<u8>,
// }

// #[derive(RustcEncodable)]
#[derive(RustcDecodable, RustcEncodable)]
struct Event {
    // message: HashMap<String, String, String>,
    replyToken: String,
    // source: HashMap<String, String>,
    timestamp: i64,
    #[serde(name="type")]
    _type: String,
}


fn main() {
    let mut server = Nickel::new();

    server.post("/", middleware! { |request|
        // format!("This is user: {:?}", request.param("userid"))
        // // let person = request.json_as::encode(&object).unwrap();
        let event = request.json_as::<Event>().unwrap();
        format!("Hello {}", event.replyToken)
    });

    server.listen("127.0.0.1:6767");
}