# Coding Style Guide
This guide goal is to help us write a coherent codebase
This guide contains how we should do things and how we should not to things
This will ease our code reviews and will help board new engineers as to adhere to our practice

## Typescript
Always declare the types of the parameters and the return type

## Comments
Comments usually results in smelly code, because they can easily get outdated and end up misleading

If you have a compelling reason to comment, it's probably time for a bit of refactoring to make the code clearer

## Default Exports
Default exports can be abused since you can default export `Good` and import it as `Bad` 

And in the case of a refactoring it makes you look manually for the usage whereas using a named export will force an error that is easily fixable

It also helps with better IDE Tooling

## ES6
Correct use of let and const

Use `await`/`async` over `then`

Please use ES6 as much as possible, for example: `const newArray = [...oldArray, newStuff]` over `oldArray.push(newStuff)`

## Reduce the usage of else
The usage of else is bad. It is a construct that some languages are thinking of eliminating.

Try always return earlier, There are some edge cases, but try to refactor your logic to avoid using `else`.


Instead of
```
const saySomethingIfTrue = () => {
  if(true){
    say("true)
  }else{
    say("false")
  }
}
```
Do something like
```
const saySomethingIfTrue = () => {
  if(true){
    return say("true)
  }
  say("false")
}
```

## Full variables naming
Don’t shorten your variables names like `crtExample` or `currExample` for `currentExample`

Granted the first of these examples are easy to type but they are harder on the brain of the other person that has never come across that use before. 

This also extends to loop variables please don't use only first letter only, but rather the full index

## Don't Repeat Yourself
https://www.taniarascia.com/refactoring-dont-repeat-yourself/

## Functional Programming Over Imperative Programming
https://www.telerik.com/blogs/functional-programming-javascript

## Better Variables Names
Write code in such a way that someone can take three lines out at random and still understand what you are trying to do.

for example `passedSkills` can be interpreted as being an array or a boolean

## Error Handling
On the api, please use the appropriate response code. Don't throw 200 and use the response to show the error

On the frontend, please use try and catch i.e no `.then().catch`. Don't check for status code in the actions the API should throw an error if anything is wrong, i.e nothing like `if(response.status)` || `if(response.ok)`

## Appropraite HTTP verbs
Make good usage of REST API verbs, here is a general overview:
```switch(whatYouWantToDo){
  case "UPDATE_PARTS_OF_A_RESOURCE":
    return"PATCH";
  case "REPLACE_AN_ENTIRE_RESOURCE":
    return "PUT";
  case "REMOVE_A_RESOURCE":
    return "DELETE";
  case "CREATING_A_RESOURCE":
    return "POST";
  case "GET_A_RESOURCE":
    return "GET;
}
```

## Frontend suggestions
1. Avoid complex logic in the render function
2. Try to always use `antd`, minimize custom components and custom css
3. Make good use of `recoil` state, getters, and setters

## Backend suggestions
1. Service should only deal with entities
4. Controllers should deal with requests

## Ending Note
The average programmer spends about 90% of his day reading code, and about 5% writing it.Typing less on the keyboard might be easier for now, but your future self will hate you for it