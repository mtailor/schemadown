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

        var cpt = { val : 0 };
        addText(cpt, svg, "minSize : " + minSize)
        addText(cpt, svg, "n : " + n)
        addText(cpt, svg, "Math.log(n) : " + Math.log(n))
        addText(cpt, svg, "charge : " + charge)
        addText(cpt, svg, "r : " + r)

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
    
    function addText(cptHolder, root, text){
        root
            .append("text")
            .text(text)
            .attr("x", "50")
            .attr("y", "" + (50 + (cptHolder.val * 15)))
            .attr("font-size", "10px")
            .attr("fill", "white");
        cptHolder.val = cptHolder.val + 1;
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
        newGraph(200, 200, nodes, links, "blue");
    })();
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
        newGraph(1000, 1000, nodes, links, "gray");
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
        newGraph(400, 400, nodes, links, "green");
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
        newGraph(170, 170, nodes, links, "yellow");
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
        newGraph(75, 75, nodes, links, "red");
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
        newGraph(750, 750, nodes, links, "purple");
    })();
})();