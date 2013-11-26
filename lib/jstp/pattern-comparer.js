var JSTPInvalidSyntaxForPattern = require('./exceptions').JSTPInvalidSyntaxForPattern;

/*
 * JSTPPatternComparer
 * ===================
 *
 * Provides a method to compare a pattern to a value and return
 * matches if there are any.
 *
 */
JSTPPatternComparer = {

  /*
   * compare( pattern, value )
   * -------------------------
   * 
   * Compares the pattern and the value. If the pattern
   * does not match the value, returns false.
   * 
   * If the pattern matches the value, it depends if it has 
   * named endpoints or not: if there are none, it returns just true,
   * and if named endpoints are present, returns a dictionary
   * with the names and corresponding values.
   * 
   * Throws JSTPInvalidSyntaxForPattern if there is an Ellipsis
   * Element Wildcard followed by an Asterisk Element Wildcard,
   * a Named Element Wildcard or another Ellipsis Element
   * Wildcard.
   *
   * If the `notUseNamedElementWildcard` flag is activated, it should
   * treat Named Element Patterns as Literal Elements.
   * 
   * Throws a plain error if either pattern or value are not Arrays.
   *
   * #### Arguments
   *
   * - Array pattern
   * - Array value
   * - _optional_ Object matches
   * - _optional_ Boolean notUseNamedElementWildcard
   * 
   * #### Returns
   *
   * - Boolean | Array matches
   *
   * #### Throws
   *
   * - JSTPInvalidSyntaxForPattern
   * - Error
   * 
   */
  compare: function (pattern, value, matches, notUseNamedElementWildcard) {
    // If either pattern of value are not Array, fail
    if (!(pattern instanceof Array)) throw new Error();
    if (!(value instanceof Array)) throw new Error();
    if (pattern.length == 0 && value.length == 0) return true;

    // Initialize the clones
    var patternClone = [];
    var valueClone   = [];

    // Switch according to the element type
    switch (pattern[0]) {

      // Asterisk Element Wildcard
      case "*":

        // If value is empty, it is false
        if (value.length == 0) return false;

        // If there is still pattern, shift and call recursively
        if (pattern.length > 1) {
          for (index in pattern)
            if (index > 0) patternClone.push(pattern[index]);
          for (index in value)
            if (index > 0) valueClone.push(value[index]);

          return this.compare(patternClone, valueClone, matches, notUseNamedElementWildcard);
        }

        // If there is still value but not more pattern, it is false
        if (value.length > 1) return false;


        // If there are matches, return the matches
        if (matches) return matches;

        // If there is neither value nor pattern left, it is true
        return true;

        break;

      // Ellipsis Element Wildcard
      /*
       * Note: Ellipsis is non-greedy, meaning that the method called
       * in order to find a match is indexOf and not lastIndexOf.
       */
      case "...":

        // If there is no pattern left after this element
        if (pattern.length == 1) {

          // If there are matches, return the matches
          if (matches) return matches;

          // Else it is true
          return true;
        }

        // If the next element is an asterisk, it should fail
        if (pattern[1] == "*") 
          throw new JSTPInvalidSyntaxForPattern(
            "Invalid Asterisk Element Wildcard after an Ellipsis Element Wildcard");

        // If the next element is an ellipsis, it should fail
        if (pattern[1] == "...") throw new JSTPInvalidSyntaxForPattern();

        // If the next element is a Named Element Wildcard
        if (!notUseNamedElementWildcard && typeof pattern[1] == "string" && pattern[1].length > 1 && pattern[1][0] == ":")
          throw new JSTPInvalidSyntaxForPattern(
            "Invalid Named Element Wildcard after an Ellipsis Element Wildcard");

        // Get indexOf next element
        var indexOfMatch = this.indexOf(value, pattern[1]);

        // If there is no match (indexOf == -1), it is false
        if (indexOfMatch == -1) return false;

        // If there is a match, shift the pattern twice
        for (index in pattern) 
          if (index > 1) patternClone.push(pattern[index]);

        // ..and shift the value until the match is gone
        for (indice in value)
          if (indice > indexOfMatch) valueClone.push(value[indice]);

        // If both the shifted pattern and value are empty
        if (patternClone.length == 0 && valueClone.length == 0) {

          // If there are matches, return the matches
          if (matches) return matches;

          // Else it is true
          return true;
        }

        // If there is still something, call recursively with the 
        // shifted pattern and value
        return this.compare(patternClone, valueClone, matches, notUseNamedElementWildcard);

        break;

      // Literal Element | Named Element Pattern
      default: 

        // If the value is empty, it is false
        if (value.length == 0) return false;
    
        // If the pattern is empty, it is false
        if (pattern.length == 0) return false;

        // Named Pattern Element
        if (!notUseNamedElementWildcard && typeof pattern[0] == "string" && pattern[0][0] == ":" && pattern[0].length > 1) {

          // Initialize and set the matches
          matches = matches || {};
          matches[pattern[0].substring(1)] = value[0];

          // If there are more elements left in pattern, shift and call recursively
          if (pattern.length > 1) {
            for (index in pattern)
              if (index > 0) patternClone.push(pattern[index]);
            for (index in value)
              if (index > 0) valueClone.push(value[index]);

            return this.compare(patternClone, valueClone, matches, notUseNamedElementWildcard);
          }

          // If there is more in value, it is false
          if (value.length > 1) return false;

          // If both pattern and value have nothing left, return the matches
          return matches;
        }

        // Literal Element
        else {
          // If the first element is different, it is false
          if (pattern[0] != value[0]) return false;

          // If there are elements left in pattern, shift and call recursively
          if (pattern.length > 1) {
            for (index in pattern) 
              if (index > 0) patternClone.push(pattern[index]);
            for (indice in value) 
              if (indice > 0) valueClone.push(value[indice]);

            return this.compare(patternClone, valueClone, matches, notUseNamedElementWildcard);
          }

          // If there is more in value, it is false
          if (value.length > 1) return false;

          // If there are matches, return the matches
          if (matches) return matches;

          // If both pattern and value have nothing left, it is true
          return true;
        }
    }
  },

  // Makes an Array equivalent for String's indexOf( String )
  indexOf: function (haystack, needle) {
    var index = -1;
    var iterator = 0;
    while (iterator < haystack.length && index == -1) {
      if (haystack[iterator] == needle)
        index = iterator;
      iterator++;
    }

    return index;
  }
}

module.exports = JSTPPatternComparer;