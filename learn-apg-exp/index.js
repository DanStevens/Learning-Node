var ApgExp = require("apg-exp");

var pattern = `
phone-number = ["("] area-code sep office-code sep subscriber
area-code    = 3digit                       ; 3 digits
office-code  = 3digit                       ; 3 digits
subscriber   = 4digit                       ; 4 digits
sep          = *3(%d32-47 / %d58-126 / %d9) ; 0-3 ASCII non-digits
digit        = %d48-57                      ; 0-9
`;

var flags = null;

var stringToMatch = "(333)555-1234";

try {
  var exp = new ApgExp(pattern, flags);
  var result = exp.exec(stringToMatch);
  if (result) {
    console.log(result.toText());
    // do something with results
  } else {
    // handle failure
  }
} catch(e) {
  console.error(e);
}
