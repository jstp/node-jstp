JSTP for Node.js
================

[JSTP/0.6 Engine 1.0](https://github.com/jstp/jstp-engine) reference implementation in Node.js.

Installation
------------

    npm install jstp

API
---

> The full API (external and internal) is thoroughly described in the [Vows.js specs](http://vowsjs.org/) in the `spec/jstp` folder. 
> To run the specs, install Vows.js globally with the `npm -g install vows` command (may require `sudo`), clone this repository, run `npm install` on the base directory of your clone and then run `vows spec/jstp/* --spec`

This implementation of a `JSTPEngine` is the reference implementation of the JSTP/0.6 Engine 1.0 recommendation. The API is divided in two parts: the external API, which is all part of the recommendation and is to be consumed by client libraries and applications, and the internal API, which comprehends the classes that manage the inner workings of the Engine, and while they are useful as reference they are neither mandatory nor part of the recommendation.

External API (Recommendation)
-----------------------------

#### `JSTPEngine`

- `#dispatch( JSTPDispatch dispatch [, JSTPCallable callback [, Object context ] ] )`

#### `JSTPDispatch`

- `#getProtocol() : Array<String>`
- `#setProtocol( Array<String> protocol ) : JSTPDispatch`
- `#getMethod() : String`
- `#setMethod( String method ) : JSTPDispatch`
- `#getResource() : Array`
- `#setResource( Array ) : JSTPDispatch`
- `#getTimestamp() : Long`
- `#setTimestamp( Long timestamp ) : JSTPDispatch`
- `#getToken() : Array<String>`
- `#setToken( Array<String> ) : JSTPDispatch`
- `#getTo() : Array<String>`
- `#setTo( Array<String> ) : JSTPDispatch`
- `#getBody() : Object`
- `#setBody( Object body ) : JSTPDispatch`
- `#getEndpoint() : JSTPEndpoint`
- `#setEndpoint( JSTPEndpoint ) : JSTPDispatch`
- `#getFrom() : Array<String>`
- `#setFrom( JSTPEndpoint endpoint ) : JSTPDispatch`
- `#validate() : Boolean`
- `isOfAnswerMorphology() : Boolean`
- `isOfSubscriptionMorphology() : Boolean`
- `isOfDispatchMorphology() : Boolean`

#### `JSTPCallable`

- `#call( JSTPTriggeringPackage triggeringPackage )`

#### 'JSTPEndpoint'

- `#getMethodPattern() : String`
- `#setMethodPattern( String method ) : JSTPEndpoint`
- `#getResourcePattern() : Array`
- `#setResourcePattern( Array ) : JSTPEndpoint`
- `#getToPattern() : Array<String>`
- `#setToPattern( Array<String> ) : JSTPEndpoint`

#### `JSTPTriggeringPackage`

- `JSTPTriggeringPackage( JSTPEngine engine, String currentEmitter ) : JSTPTriggeringPackage`
- `#getEngine() : JSTPEngine`
- `#getCurrentEmitter() : String`
- `#getDispatch() : JSTPDispatch`
- `#setDispatch( JSTPDispatch dispatch ) : JSTPTriggeringPackage`
- `#getAnswer() : JSTPDispatch`
- `#setAnswer( JSTPDispatch answer ) : JSTPTriggeringPackage`
- `#anwer( Integer statusCode [, Object body [, JSTPCallable callback [, Object context ] ] ] ) : JSTPTriggeringPackage`
- `#dispatch( JSTPDispatch dispatch [, JSTPCallable callback [, Object context ] ] ) : JSTPTriggeringPackage`

Internal API
------------

In this section I will share comments about the architecture of the internal API.

### Separation of concerns

- Only `JSTPEngine` and `JSTPTransactionManager` can generate and send to process new Dispatches. In case that any other object finds a condition which may cause an Answer Dispatch to be sent, it should limit itself to throw an exception named after the format `JSTP<StatusCodeDescription>` such as `JSTPNotFound` for `404` Not Found Answers. The right party will contextually choose either to generate and process a new Answer Dispatch or to just propagate the exception.

License
-------

Copyright © 2013 Fernando Vía Canel, Luciano Bertenasco and SouthLogics

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.