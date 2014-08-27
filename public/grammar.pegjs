//TODO reprendre la vraie grammaire

start
  = line

line "line"
  = left:identifier s arrow s right:identifier { return { left : left, right : right };}

identifier "identifier"
  = chars:[a-zA-Z]+ { return chars.join(""); }

arrow "arrow"
  = "=>"

s "spaces"
 = " "+
