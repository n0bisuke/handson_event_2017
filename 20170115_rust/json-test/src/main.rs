extern crate rustc_serialize;
use rustc_serialize::json;

pub struct Status {
    pub api: String,
    pub space: String,
    pub url: String,
}

fn main() {
    let status: String = json::encode(&Status{
        api: "0.13".to_string(),
        space: "coredump".to_string(),
        url: "https://www.coredump.ch/".to_string(),
    }).unwrap();
    println!("{}", status);
}