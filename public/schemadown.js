(function(){


    function newGraph(width, height, nodes, links, color){

        //some kind of factor indicating how much room is available
        var n = nodes.length;
        var factor = (width + height) / Math.log(n);
        var r = factor * 0.08;
        console.log(factor)

        //place the nodes on some kind of zigzag
        nodes.forEach(function(d, i) {
            d.x = n == 1 ? width / 2 : i * width / (n-1);
            d.y = i % 2 == 0 ? height : 0;
        });

        var force = d3.layout.force()
            .charge(-factor * 20)
            //.chargeDistance(factor * 0.5)
            .gravity(200 / factor)
            //.linkDistance(factor * 0.7)
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
            .attr("r", r);

        force.on("tick", function() {
            link
                .attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });

            node
                .attr("cx", function(d) { return d.x = Math.max(r, Math.min(width - r, d.x)); })
                .attr("cy", function(d) { return d.y = Math.max(r, Math.min(height - r, d.y)); });
        });
    }

    function newLink(n1, n2) {
        return {
            source : n1,
            target : n2
        };
    }

    (function(){
        var a = {};
        var b = {};
        var c = {};
        var d = {};
        var e = {};
        var f = {};
        var g = {};
        var h = {};
        var i = {};
        var j = {};
        var nodes = [a, b, c, d, e, f, g, h, i, j];
        var links = [
            newLink(a, b),
            newLink(b, c),
            newLink(c, d),
            newLink(d, e),
            newLink(e, f),
            newLink(f, a),
            newLink(a, h),
            newLink(a, i),
            newLink(a, j),
            newLink(g, a),
            newLink(g, b),
            newLink(g, f),
            newLink(g, d)
        ];
        newGraph(250, 250, nodes, links, "blue");
    })();
    (function(){
        var a = {};
        var b = {};
        var c = {};
        var d = {};
        var e = {};
        var f = {};
        var nodes = [a, b, c, d, e, f];
        var links = [
            newLink(a, b),
            newLink(b, c),
            newLink(b, d),
            newLink(b, e),
            newLink(f, c),
            newLink(f, d),
            newLink(f, e)
        ];
        newGraph(800, 500, nodes, links, "green");
    })();
    (function(){
        var a = {};
        var b = {};
        var c = {};
        var d = {};
        var nodes = [a, b, c, d];
        var links = [
            newLink(a, b),
            newLink(b, c),
            newLink(c, d)
        ];
        newGraph(400, 800, nodes, links, "yellow");
    })();
    (function(){
        var a = {};
        var b = {};
        var c = {};
        var nodes = [a, b, c];
        var links = [
            newLink(a, b),
            newLink(b, c)
        ];
        newGraph(150, 100, nodes, links, "orange");
    })();
})();