var exceptions    = require("./exceptions");
var JSTPEndpoint  = require("./endpoint");
/*
 * JSTPDispatch
 * ============
 *
 * The object representation of the JSTP Dispatch. 
 * 
 * `JSTPDispatch` offers accessors for every Header and a validation 
 * routine to check the correctness of the headers.
 * 
 */
function JSTPDispatch() {

}

/* 
 * setProtocol( Array<String> protocol )
 * -------------------------------------
 * 
 * Sets the protocol header with the corresponding array of strings. If the 
 * argument is null, restores the protocol header to the default.
 *
 * Throws an exception if the argument is not a valid protocol string.
 * 
 * > The default in the current version of JSTP is `["JSTP", "0.6"]`.
 * 
 * #### Arguments
 *
 * - Array<String> protocol
 *
 * #### Throws
 *
 * - JSTPInvalidProtocolHeaderDefinition
 *
 */
JSTPDispatch.prototype.setProtocol = function ( protocol ) {
  if (protocol != null && protocol.length == 0)
    throw new exceptions
      .JSTPInvalidProtocolHeaderDefinition(
        "Invalid Protocol Header definition: must not be empty");

  if (protocol != null && !(protocol instanceof Array))
    throw new exceptions
      .JSTPInvalidProtocolHeaderDefinition(
        "Invalid Protocol Header definition: must be an array"); 

  if (protocol != null && protocol instanceof Array) {
    var index = 0;
    while (index < protocol.length) {
      if (typeof protocol[index] != "string")
        throw new exceptions
          .JSTPInvalidProtocolHeaderDefinition(
            "Invalid Protocol Header definition: must be a string (element #" + 
            (index + 1) + ")"); 
      
      index ++;
    }
  }

  this.protocol = protocol;

  return this;
} 

/*
 * getProtocol()
 * -------------
 *
 * Returns the protocol header array. Sets and returns the default if not set.
 *
 * #### Returns
 * 
 * - Array<String> protocol
 *
 */
JSTPDispatch.prototype.getProtocol = function () {
  if (!this.protocol) 
    this.protocol = ["JSTP", "0.6"];

  return this.protocol;
}

/* 
 * setMethod( String method )
 * -------------------------------------
 * 
 * Sets the method header with the corresponding string.
 *
 * Throws an exception if the argument is not a string.
 *
 * Returns self for chainability.
 * 
 * #### Arguments
 *
 * - String method
 *
 * #### Throws
 *
 * - JSTPInvalidMethodHeaderDefinition
 *
 */
JSTPDispatch.prototype.setMethod = function (method) {
  if (method != null && typeof method != "string")
    throw new exceptions
      .JSTPInvalidMethodHeaderDefinition(
        "Invalid Method Header definition: must be a non empty string");

  if (method != null && method == "")
    throw new exceptions
      .JSTPInvalidMethodHeaderDefinition(
        "Invalid Method Header definition: must be a non empty string");

  this.method = method;

  return this;
}

/*
 * getMethod()
 * -------------
 *
 * Returns the method header string. Returns null if not set.
 *
 * #### Returns
 * 
 * - String method
 *
 */
JSTPDispatch.prototype.getMethod = function () {
  return this.method;
}

/* 
 * setResource( Array resource )
 * -------------------------------------
 * 
 * Sets the resource header with the corresponding array. If null, sets the resource
 * to an empty array.
 *
 * Throws an exception if the argument is not a valid resource array.
 *
 * #### Arguments
 *
 * - Array resource
 *
 * #### Throws
 *
 * - JSTPInvalidResourceHeaderDefinition
 *
 */
JSTPDispatch.prototype.setResource = function (resource) {
  if (resource != null && !(resource instanceof Array))
    throw new exceptions
      .JSTPInvalidResourceHeaderDefinition(
        "Invalid Resource Header definition: must be an array");

  this.resource = resource;

  return this;
}

/*
 * getResource()
 * -------------
 *
 * Returns the resource header array. Sets and returns an empty array if not set.
 *
 * #### Returns
 * 
 * - Array<String> resource
 *
 */
JSTPDispatch.prototype.getResource = function () {
  if (!this.resource)
    this.resource = [];

  return this.resource;
}

/* 
 * setTimestamp( Long timestamp )
 * --------------
 *
 * Sets the timestamp header long integer.
 * 
 * Throws an exception if the argument is not valid long integer.
 * 
 * #### Arguments
 * 
 * - Long timestamp
 *
 * #### Throws
 *
 * - JSTPInvalidTimestampHeaderDefinition
 *
 */
JSTPDispatch.prototype.setTimestamp = function (timestamp) {
  if (isNaN(timestamp))
    throw new exceptions
      .JSTPInvalidTimestampHeaderDefinition(
        "Invalid Timestamp Header definition: is not a number");

  this.timestamp = timestamp;

  return this;
}

/*
 * getTimestamp()
 * -------------
 *
 * Returns the timestamp header number. Sets and 
 * returns the current time if not set.
 *
 * #### Returns
 * 
 * - Long timestamp
 *
 */
JSTPDispatch.prototype.getTimestamp = function () {
  if (!this.timestamp)
    this.timestamp = new Date().getTime();
  
  return this.timestamp;
}

/* 
 * setFrom( Array<String> from )
 * -------------------------------------
 * 
 * Sets the from header with the corresponding array. If null, sets the from
 * to an empty array.
 *
 * Throws an exception if the argument is not a valid from array.
 *
 * #### Arguments
 *
 * - Array<String> from
 *
 * #### Throws
 *
 * - JSTPInvalidFromHeaderDefinition
 *
 */
JSTPDispatch.prototype.setFrom = function (from) {
  if (from != null && !(from instanceof Array))
    throw new exceptions.JSTPInvalidFromHeaderDefinition(
      "Invalid From Header definition: not an array");

  if (from != null) {
    var index = 0;
    while (index < from.length) {
      if (typeof from[index] != "string") 
        throw new exceptions
          .JSTPInvalidFromHeaderDefinition(
            "Invalid From Header definition: must be a string (element #" + 
            (index + 1) + ")"); 
      index ++;
    }
  }

  this.from = from;

  return this;
}

/*
 * getFrom()
 * -------------
 *
 * Returns the from header array. Sets and returns an empty array if not set.
 *
 * #### Returns
 * 
 * - Array<String> from
 *
 */
JSTPDispatch.prototype.getFrom = function () {
  if (!this.from)
    this.from = [];

  return this.from;
}

/* 
 * setToken( Array<String> token )
 * -------------------------------------
 * 
 * Sets the token header with the corresponding array of strings. If the 
 * argument is null, restores the token header to an empty array. 
 *
 * The token array must be an array of string of one or two elements.
 *
 * Throws an exception if the argument is not a valid token array.
 *  
 * #### Arguments
 *
 * - Array<String> token
 *
 * #### Throws
 *
 * - JSTPInvalidTokenHeaderDefinition
 *
 */
JSTPDispatch.prototype.setToken = function ( token ) {
  if (token != null && !(token instanceof Array))
    throw new exceptions
      .JSTPInvalidTokenHeaderDefinition(
        "Invalid Token Header definition: must be an array");

  if (token != null && token.length > 2)
    throw new exceptions
      .JSTPInvalidTokenHeaderDefinition(
        "Invalid Token Header definition: must be one or two elements");

  if (token != null) {
    var index = 0;
    while (index < token.length) {
      if (typeof token[index] != "string") 
        throw new exceptions
          .JSTPInvalidTokenHeaderDefinition(
            "Invalid Token Header definition: must be a string (element #" + 
            (index + 1) + ")"); 
      index ++;
    }
  }

  this.token = token;

  return this;
} 

/*
 * getToken()
 * -------------
 *
 * Returns the token header array. Sets and returns an empty array if not set.
 *
 * #### Returns
 * 
 * - Array<String> token
 *
 */
JSTPDispatch.prototype.getToken = function () {
  if (!this.token)
    this.token = [];

  return this.token;
}

/*
 * setBody( Object body )
 * ----------------------
 *
 * Sets the body header.
 * 
 * Throws an error if the provided body is a Function.
 *
 * #### Arguments
 * 
 * - Object body
 *
 * #### Throws
 *
 * - JSTPInvalidBodyHeaderDefinition
 *
 */
JSTPDispatch.prototype.setBody = function (body) {
  if (body instanceof Function)
    throw new exceptions.
      JSTPInvalidBodyHeaderDefinition(
        "Invalid Body Header definition: must not be a Function");
      
  this.body = body;

  return this;
}

/*
 * getBody
 * -------
 *
 * Gets the body.
 *
 * #### Returns
 * 
 * - Object body
 * 
 */
JSTPDispatch.prototype.getBody = function () {
  if (this.body == undefined)
    this.body = null;

  return this.body;
}

/* 
 * setTo( Array<String> to )
 * -------------------------------------
 * 
 * Sets the to header with the corresponding array of strings. If the 
 * argument is null, restores the to header to the default.
 *
 * Throws an exception if the argument is not a valid to string.
 * 
 * > The default in the current version of JSTP is `["JSTP", "0.6"]`.
 * 
 * #### Arguments
 *
 * - Array<String> to
 *
 * #### Throws
 *
 * - JSTPInvalidToHeaderDefinition
 *
 */
JSTPDispatch.prototype.setTo = function ( to ) {
  if (to != null && !(to instanceof Array))
    throw new exceptions
      .JSTPInvalidToHeaderDefinition(
        "Invalid To Header definition: must be an array"); 

  if (to != null && to instanceof Array) {
    var index = 0;
    while (index < to.length) {
      if (typeof to[index] != "string")
        throw new exceptions
          .JSTPInvalidToHeaderDefinition(
            "Invalid To Header definition: must be a string (element #" + 
            (index + 1) + ")"); 
      
      index ++;
    }
  }

  this.to = to;

  return this;
} 

/*
 * getTo()
 * -------
 *
 * Returns the to header array. Sets and returns an empty array if not set.
 *
 * #### Returns
 * 
 * - Array<String> to
 *
 */
JSTPDispatch.prototype.getTo = function () {
  if (!this.to) 
    this.to = [];

  return this.to;
}

/* 
 * setEndpoint( JSTPEndpoint endpoint )
 * ------------------------------------
 *
 * Sets the endpoint header to the argument JSTPEndpoint. 
 * 
 * If the argument is null, cleans the endpoint header.
 *
 * Throws an error if the argument is neither a JSTPEndpoint nor null.
 *
 * #### Arguments
 *
 * - JSTPEndpoint endpoint
 *
 * #### Throws
 *
 * - JSTPInvalidEndpointHeaderDefinition
 *
 */
JSTPDispatch.prototype.setEndpoint = function (endpoint) {
  if (endpoint != null && !(endpoint instanceof JSTPEndpoint))
    throw new exceptions
      .JSTPInvalidEndpointHeaderDefinition(
        "Invalid Endpoint Header definition: must be a JSTPEndpoint");

  this.endpoint = endpoint;

  return this;
}

/*
 * getEndpoint()
 * -------------
 *
 * Gets the endpoint header. Returns null if not set.
 *
 * #### Returns
 *
 * - JSTPEndpoint endpoint
 *
 */
JSTPDispatch.prototype.getEndpoint = function () {
  if (this.endpoint == undefined)
    this.endpoint = null;

  return this.endpoint;
}

/*
 * isOfAnswerMorphology()
 * ----------------------
 *
 * Returns true if the method property is set to 'ANSWER'.
 *
 * Returns false otherwise.
 *
 * #### Returns
 *
 * - Boolean isOfAnswerMorphology
 *
 */
JSTPDispatch.prototype.isOfAnswerMorphology = function () {
  return this.method == "ANSWER";
}

/*
 * isOfSubscriptionMorphology()
 * ----------------------
 *
 * Returns true if the method property is set to 'BIND' or 'RELEASE'.
 *
 * Returns false otherwise.
 *
 * #### Returns
 *
 * - Boolean isOfSubscriptionMorphology
 *
 */
JSTPDispatch.prototype.isOfSubscriptionMorphology = function () {
  return this.method == "BIND" || this.method == "RELEASE";
}

/*
 * isOfRegularMorphology()
 * ----------------------
 *
 * Returns true if it is neither an Answer not a Subscription dispatch.
 *
 * Returns false if it is.
 *
 * #### Returns
 *
 * - Boolean isOfRegularMorphology
 *
 */
JSTPDispatch.prototype.isOfRegularMorphology = function () {
  return !this.isOfSubscriptionMorphology() && !this.isOfAnswerMorphology();
}

/*
 * validate()
 * ----------
 *
 * Validates the internal coherence of the JSTPDispatch.
 *
 * 1. Validates that the protocol version as described in the Protocol 
 *    Header is supported by this implementation. For the `0.6` version:
 *
 * 2. If the JSTPDispatch is of the Answer Morphology:
 *    1. Verifies that it features no Endpoint Header.
 *    2. Verifies that the Resource Header matches the specification for 
 *       the [Answer Morphology](https://github.com/jstp/jstp-rfc/blob/master/version/0.6/syntax/resource.md#answer-morphology)
 *    3. Verifies that the To Header is empty
 *
 * 3. If the JSTPDispatch is of the Subscription Morphology:
 *    1. Verifies that it features no Resource Header.
 *    2. Verifies that the Endpoint Header is valid (calls the #validate method 
 *       for the JSTPEndpint).
 * 
 * 4. If the JSTPDispatch is of the Regular Morphology:
 *    1. Verifies that it features no Endpoint Header.
 *    2. Verifies that the Resource Header is not empty.
 * 
 * If any of the verifications fails, it throws a relevant exception.
 * If everything is ok, it returns `true`.
 *
 * #### Returns
 * 
 * - Boolean isValid
 *
 * #### Throws
 *
 * - JSTPUnrecognizedProtocol
 * - JSTPUnsupportedProtocolVersion
 * - JSTPInvalidEndpointInAnswer
 * - JSTPInvalidResourceHeaderForAnswer
 * - JSTPInvalidStatusCode
 * - JSTPInvalidToInAnswer
 * - JSTPMissingEndpointInSubscription
 * - JSTPInvalidResourceInSubscription
 * - JSTPInvalidEndpointInRegular
 * - JSTPMissingResourceInRegular
 * 
 */
JSTPDispatch.prototype.validate = function () {
  if (this.getProtocol()[0] != "JSTP")
    throw new exceptions.
      JSTPUnrecognizedProtocol(
        "Unrecognized Protocol: must be 'JSTP'");

  if (this.getProtocol()[1] != "0.6")
    throw new exceptions.
      JSTPUnsupportedProtocolVersion(
        "Unsupported Protocol Version: only 0.6 is supported");

  if (!this.getMethod())
    throw new exceptions.
      JSTPMissingMethodHeader(
        "The Method Header is required");

  if (this.isOfAnswerMorphology()) {
    if (this.getEndpoint())
      throw new exceptions.
        JSTPInvalidEndpointInAnswer(
          "Invalid not null Endpoint in Answer Morphology");

    if (this.getResource().length < 3)
      throw new exceptions.
        JSTPInvalidResourceHeaderForAnswer(
          "Must have Status Code, Transaction ID and Triggering ID");

    if (typeof this.getResource()[2] != "string" && typeof this.getResource()[2] != "number")
      throw new exceptions.
        JSTPInvalidResourceHeaderForAnswer(
          "Invalid Triggering ID type: must be string or number");

    if (typeof this.getResource()[1] != "string" && typeof this.getResource()[1] != "number")
      throw new exceptions.
        JSTPInvalidResourceHeaderForAnswer(
          "Invalid Transaction ID type: must be string or number");

    if (typeof this.getResource()[1] != "string" && typeof this.getResource()[1] != "number")
      throw new exceptions.
        JSTPInvalidResourceHeaderForAnswer(
          "Invalid Transaction ID type: must be string or number");

    if (!parseInt(this.getResource()[0]))
      throw new exceptions.
        JSTPInvalidStatusCode(
          "The status code must be a non zero integer");

    if (this.getTo().length > 0)
      throw new exceptions.
        JSTPInvalidToInAnswer(
          "The To Header must be empty in an Answer Dispatch");

  }
  else if (this.isOfSubscriptionMorphology()) {
    if (!this.getEndpoint())
      throw new exceptions.
        JSTPMissingEndpointInSubscription(
          "Missing Endpoint in Subscription");

    this.getEndpoint().validate();

    if (this.getResource().length > 0) 
      throw new exceptions.
        JSTPInvalidResourceInSubscription(
          "The Resource Header must be empty in a Subscription Dispatch");

  }

  else {

    if (this.getEndpoint())
      throw new exceptions.
        JSTPInvalidEndpointInRegular(
          "The Endpoint Header must be null in a Regular Dispatch");

    if (this.getResource().length == 0)
      throw new exceptions.
        JSTPMissingResourceInRegular(
          "The Resource Header is required in a Regular Dispatch");
  }

  return true;
}

module.exports = JSTPDispatch;