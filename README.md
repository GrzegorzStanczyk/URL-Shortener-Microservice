# URL-Shortener-Microservice
Live [https://sulky-forger.glitch.me/](https://sulky-forger.glitch.me/)

## User stories:
1. I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
2. If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.
3. When I visit that shortened URL, it will redirect me to my original link.

## Example usage:
`https://sulky-forger.glitch.me/https://www.mongodb.com/`  

## Example output:
```
{ 
  "url":"https://sulky-forger.glitch.me/https://www.mongodb.com/",  
  "short_url":"https://sulky-forger.glitch.me/3" 
}
```

## Usage:
`https://sulky-forger.glitch.me/3`

## Will redirect to:
`https://www.mongodb.com/`