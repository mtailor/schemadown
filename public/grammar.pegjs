{

 function getNodeByName(name, nodes){
   for (var i = 0; i < nodes.length; i++){
     if(nodes[i].name == name) {
        return nodes[i];
     }
   }
   //add it if it didn't exist
   var node = {
     name : name
   };
   nodes.push(node);
   return node;
 }

 function newLink(n1, n2){
   return {
     source : n1,
     target : n2
   };
 }
 
 function buildNodesAndLinks(tree){
   var nodes = [];
   var links = [];
   for (var i = 0; i < tree.length; i++){
     var a = getNodeByName(tree[i].left, nodes);
     var b = getNodeByName(tree[i].right, nodes);
     links.push(newLink(a, b));
   }
   return {
     nodes : nodes,
     links : links
   };
 }

 

}


start
  = tree:fullSyntaxTree { return buildNodesAndLinks(tree);}

fullSyntaxTree
  = eol* firstLink:link links:eolsAndLink* eol* {
links.unshift(firstLink); return links; }

linkWithEols
 = link:link eol+ { return link; }


eolsAndLink
 = eol+ link:link { return link; }

link
  = s? left:identifier s arrow s right:identifier s? {
  return {
    left : left,
    right : right
  };
}

identifier
  = chars:[a-zA-Z]+ { return chars.join(""); }

arrow
  = "=>"

s
 = " "+

eol
 = "\n"
