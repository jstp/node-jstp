var exceptions = require("./exceptions");
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
 * setResource( Array<String> resource )
 * -------------------------------------
 * 
 * Sets the resource header with the corresponding array. If null, sets the resource
 * to an empty array.
 *
 * Throws an exception if the argument is not a valid resource array.
 *
 * #### Arguments
 *
 * - Array<String> resource
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

  if (resource != null && resource.length == 0)
    throw new exceptions
      .JSTPInvalidResourceHeaderDefinition(
        "Invalid Resource Header definition: must not be empty");

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

module.exports = JSTPDispatch;