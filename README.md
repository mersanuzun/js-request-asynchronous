# Making request for async in javascript.

```
Request("http://jsonplaceholder.typicode.com").path(["comments"]).get().then((r) => {console.log(r)})

Request("http://localhost:3000").path(["postResult"]).data({name: "ersan"}).post().then((result) => {
	console.log(result); 
	Request("http://jsonplaceholder.typicode.com/albums").get().then((sResult) => {
		console.log("içerde" + sResult);
	}).catch((err) => {
		console.log("içerde " + err);
	});
}).catch((err) => {
	console.log(err)
});
```
