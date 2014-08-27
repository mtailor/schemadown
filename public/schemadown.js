(function(){

    function newGraph(width, height, nodes, links, color){

        //some kind of factor indicating how much room is available
        var n = nodes.length;
        var minSize = Math.min(width, height);
        var factor = minSize / Math.log(n);
        var charge = -0.15 * minSize * minSize / n;
        var r      = 0.2 * minSize / Math.sqrt(n);

        //place the nodes on some kind of zigzag
        nodes.forEach(function(d, i) {
            d.x = n == 1 ? width / 2 : i * width / (n-1);
            d.y = i % 2 == 0 ? height : 0;
        });

        var force = d3.layout.force()
            .charge(charge)
            .size([width, height]);

        var svg = d3
            .select("body")
            .append("svg")
            .attr("style", "border-color:" + color)
            .attr("width", width)
            .attr("height", height);
            
        
        force
            .nodes(nodes)
            .links(links)
            .start();

        var link = svg
            .selectAll(".link")
            .data(links)
            .enter()
            .append("line")
            .attr("class", "link");

        var node = svg
            .selectAll(".node")
            .data(nodes)
            .enter()
            .append("circle")
            .attr("class", "node")
            .attr("r", r)
            .call(force.drag)
            ;


        force.on("tick", function() {
            link
                .attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });

            node
                .attr("cx", function(d) { return d.x = Math.max(r, Math.min(width  - r, d.x)); })
                .attr("cy", function(d) { return d.y = Math.max(r, Math.min(height - r, d.y)); });
        });
    }

    function newLink(n1, n2) {
        return {
            source : n1,
            target : n2
        };
    }
    
    
    function schemadown(file){
        d3.text(file, function(content){
           var nodesAndLinks = GeneratedParser.parse(content);
           newGraph(500, 500, nodesAndLinks.nodes, nodesAndLinks.links, "black");
        });
    }
    

    schemadown("example.schemadown");

})();