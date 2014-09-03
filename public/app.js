'use strict';


angular
.module('myApp', [])
.controller('mainController', function($scope, $http, parsingService, drawingService){
    $http.get('example.schemadown').success(function(data){
        $scope.input = data;
        $scope.parseInput();
    });
    $scope.parseInput = function(){
        parsingService
            .parseAsNodesAndLinks($scope.input)
            .then(function(res){
                drawingService.draw(res);
            });
    };
})
.service('parsingService', function($http){
    this.parseAsNodesAndLinks = function(str) {
        return $http
            .get('grammar.pegjs')
            .then(function(response){
                var grammar = response.data;
                return PEG.buildParser(grammar).parse(str);
            });
    }
})
.service('colorService', function(){
    this.getColor = function(someStr){
        var randomColor = '#' + md5(someStr).slice(0, 6);
        var nicerColor = one.color(randomColor).lightness(0.5).saturation(0.5).hex();
        return nicerColor;
    }
})
.service('drawingService', function(colorService){
    this.draw = function(nodesAndLinks){
        var width = 500;
        var height = 500;
        var nodes = nodesAndLinks.nodes;
        var links = nodesAndLinks.links;
    
        var n = nodes.length;
        var minSize = Math.min(width, height);
        var charge = -0.15 * minSize * minSize / n;
        var r      = 0.2 * minSize / Math.sqrt(n);
        var arrowSize = 0.3 * r;

        //place the nodes on some kind of zigzag
        nodes.forEach(function(d, i) {
            d.x = n == 1 ? width / 2 : i * width / (n-1);
            d.y = i % 2 == 0 ? height : 0;
        });
        
        var svg = d3.select('svg');

        //clear
        svg
            .attr("width", width)
            .attr("height", height)
            .selectAll("*")
            .remove();
            

        //setup the layout    
        var force = 
            d3
            .layout
            .force()
            .charge(charge)
            .size([width, height]);
            
        //start it    
        force
            .nodes(nodes)
            .links(links)
            .start();
            
            
        //arrowheads
        svg
            .append("defs")
            .append("marker")
            .attr("id", "arrowhead")
            .attr("refX", arrowSize + r)
            .attr("refY", arrowSize / 2)
            .attr("markerWidth", arrowSize)
            .attr("markerHeight", arrowSize)
            .attr("orient", "auto")
            .append("path")
            .attr("d", "M0,0L0," + arrowSize + "L" + arrowSize +"," + arrowSize/2);
            
        var links = svg
            .selectAll(".link")
            .data(links)
            .enter()
            .append("line")
            .attr("marker-end", "url(#arrowhead)")
            .attr("class", "link");
        
        var gNodes = svg
            .selectAll("g.gnode")
            .data(nodes)
            .enter()
            .append('g')
            .classed('gnode', true)
            .call(force.drag);
       
        gNodes
            .append("circle")
            .attr("class", "node")
            .attr("stroke", "black")
            .attr("fill", function(d){ return colorService.getColor(d.name);})
            .attr("fill-opacity", "1")
            .attr("r", r);
            
        gNodes
            .append("rect")
            .attr("width", r * 2)
            .attr("height", r * 2)
            .attr("x", -r )
            .attr("y", -r )
            .attr("stroke", "none")
            .attr("fill", "none");
            
        gNodes
            .append("text")
            .attr("fill", "black")
            .attr("font-size", "15")
            .attr("textLength", r *2 * 0.9)
            .attr("lengthAdjust", "spacingAndGlyphs")
            .attr("x", -r*0.9)
            .attr("y", 3)
            .text(function(d){return d.name;});
            
        force.on("tick", function() {
            gNodes
                .attr("transform", function(d) { 
                    d.x = Math.max(r, Math.min(width  - r, d.x));    
                    d.y = Math.max(r, Math.min(height - r, d.y));    
                    return 'translate(' + [d.x, d.y] + ')'; 
                }
            );
            links
                .attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });
        });
    };
    
    
})
;