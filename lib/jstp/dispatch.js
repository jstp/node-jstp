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
 * Sets the protocol header with the corresponding array of strings.
 *
 * Throws an exception if the argument is not a valid protocol string.
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
} 

/*
 * getProtocol()
 * -------------
 *
 * Returns the protocol header array. Returns null if not set.
 *
 * #### Returns
 * 
 * - Array<String> protocol
 *
 */
JSTPDispatch.prototype.getProtocol = function () {
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
 * Sets the resource header with the corresponding array.
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
 * Returns the resource header array. Returns null if not set.
 *
 * #### Returns
 * 
 * - Array<String> resource
 *
 */
JSTPDispatch.prototype.getResource = function () {
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
 * Returns the timestamp header number. Returns null if not set.
 *
 * #### Returns
 * 
 * - Long timestamp
 *
 */
JSTPDispatch.prototype.getTimestamp = function () {
  return this.timestamp;
}

module.exports = JSTPDispatch;