var Graph = require('./graph');

var graph = new Graph();

graph.add('time', [{value: 'date.getTime()'}]);

graph.add('year', [{value: 'date.getFullYear()'}]);
graph.add('month', [{value: 'date.getMonth()'}]);
graph.add('date', [{value: 'date.getDate()'}]);
graph.add('day', [{value: 'date.getDay()'}]);
graph.add('hours', [{value: 'date.getHours()'}]);
graph.add('minutes', [{value: 'date.getMinutes()'}]);
graph.add('seconds', [{value: 'date.getSeconds()'}]);
graph.add('ms', [{value: 'date.getMilliseconds()'}]);

graph.add('utcyear', [{value: 'date.getUTCFullYear()'}]);
graph.add('utcmonth', [{value: 'date.getUTCMonth()'}]);
graph.add('utcdate', [{value: 'date.getUTCDate()'}]);
graph.add('utcday', [{value: 'date.getUTCDay()'}]);
graph.add('utchours', [{value: 'date.getUTCHours()'}]);
graph.add('utcminutes', [{value: 'date.getUTCMinutes()'}]);
graph.add('utcseconds', [{value: 'date.getUTCSeconds()'}]);
graph.add('utcms', [{value: 'date.getUTCMilliseconds()'}]);

graph.add('timezone', [{value: 'date.getTimezoneOffset()'}]);

graph.add('abszone', [
  {value:"Math.abs("},
  {name:"timezone"},
  {value:")"}
]).to('timezone');
graph.add('dirzone', [
  {value:"("},
  {name:"timezone"},
  {value:" > 0 ? \"-\" : \"+\")"}
]).to('timezone');
graph.add('hrzone', [
  {value:"(\"0\" + (("},
  {name:"abszone"},
  {value:" / 60) | 0)).slice(-2)"}
]).to('abszone');
graph.add('minzone', [
  {value:"(\"0\" + "},
  {name:"abszone"},
  {value:" % 60).slice(-2)"}
]).to('abszone');

graph.add('days', [{value: JSON.stringify("Sun,Mon,Tues,Wednes,Thurs,Fri,Satur".split(','))}]);
graph.add('months', [{value: JSON.stringify("January,February,March,April,May,June,July,August,September,October,November,December".split(','))}]);

graph.add(':day', [
  {name: "days"},
  {value: "["},
  {name: "day"},
  {value: "]"}
]).to(['days', 'day']);

graph.add('d', [
  {value: "(\"0\" + "},
  {name: "date"},
  {value: ").slice(-2)"}
]).to('date');
graph.add('D', [
  {name: ":day"},
  {value: ".slice(0, 3)"}
]).to(':day');
graph.add('j', [
  {name: "date"}
]).to('date');
graph.add('l', [
  {name: ":day"},
  {value: " + \"day\""}
]).to(':day');
graph.add('N', [
  {value: "("},
  {name: "day"},
  {value: " || 7)"}
]).to('day');
graph.add('w', [
  {name: "day"}
]).to('day');

graph.add('F', [
  {name: "months"},
  {value: "["},
  {name: "month"},
  {value: "]"}
]).to(['months', 'month']);
graph.add('m', [
  {value: "(\"0\" + "},
  {name: "n"},
  {value: ").slice(-2)"}
]).to('n');
graph.add('M', [
  {name: "F"},
  {value: ".slice(0, 3)"}
]).to('F');
graph.add('n', [
  {name: "month"},
  {value: " + 1"}
]).to('month');

graph.add('Y', [
  {name: "year"}
]).to('year');
graph.add('y', [
  {value: "(\"\" + "},
  {name: "year"},
  {value: ").slice(-2)"}
]).to('year');

graph.add('a', [
  {name: "hours"},
  {value: " > 11 ? \"pm\" : \"am\""}
]).to('hours');
graph.add('A', [
  {name: "hours"},
  {value: " > 11 ? \"PM\" : \"AM\""}
]).to('hours');
graph.add('B', [
  {value: "(\"00\" + ((("},
  {name: "utchours"},
  {value: " * 3600 + "},
  {name: "utcminutes"},
  {value: " * 60 + "},
  {name: "utcseconds"},
  {value: " + 3600) / 86.4) | 0) % 1e3).slice(-3)"}
]).to(['utchours', 'utcminutes', 'utcseconds']);
graph.add('g', [
  {value: "("},
  {name: "hours"},
  {value: " % 12 || 12)"}
]).to('hours');
graph.add('G', [
  {name: "hours"}
]).to('hours');
graph.add('h', [
  {value: "(\"0\" + "},
  {name: "g"},
  {value: ").slice(-2)"}
]).to('g');
graph.add('H', [
  {value: "(\"0\" + "},
  {name: "hours"},
  {value: ").slice(-2)"}
]).to('hours');
graph.add('i', [
  {value: "(\"0\" + "},
  {name: "minutes"},
  {value: ").slice(-2)"}
]).to('minutes');
graph.add('s', [
  {value: "(\"0\" + "},
  {name: "seconds"},
  {value: ").slice(-2)"}
]).to('seconds');
graph.add('u', [
  {value: "(\"00\" + "},
  {name: "ms"},
  {value: ").slice(-3)"}
]).to('ms');

graph.add('I', [
  {value: "((new Date("},
  {name: "year"},
  {value: ", 0) - Date.UTC("},
  {name: "year"},
  {value: ", 0)) === (new Date("},
  {name: "year"},
  {value: ", 6) - Date.UTC("},
  {name: "year"},
  {value: ", 6)) ? 0 : 1))"}
]).to('year');
graph.add('O', [
  {name: "dirzone"},
  {value: " + "},
  {name: "hrzone"},
  {value: " + "},
  {name: "minzone"}
]).to(['dirzone', 'hrzone', 'minzone']);
graph.add('P', [
  {name: "dirzone"},
  {value: " + "},
  {name: "hrzone"},
  {value: " + \":\" + "},
  {name: "minzone"}
]).to(['dirzone', 'hrzone', 'minzone']);
graph.add('T', [
  {value: "\"UTC\""}
]); // TODO: fix this
graph.add('Z', [
  {value: "-"},
  {name: "timezone"},
  {value: " * 60"}
]).to('timezone'); // TODO: check this

graph.add('c', [
  {name: "Y"},
  {value: "-"},
  {name: "m"},
  {value: "-"},
  {name: "d"},
  {value: "T"},
  {name: "H"},
  {value: ":"},
  {name: "i"},
  {value: ":"},
  {name: "s"},
  {name: "P"}
]).to(['Y', 'm', 'd', 'H', 'i', 's', 'P']);
graph.add('r', [
  {name: "D"},
  {value: ", "},
  {name: "d"},
  {value: " "},
  {name: "M"},
  {value: " "},
  {name: "Y"},
  {value: " "},
  {name: "H"},
  {value: ":"},
  {name: "i"},
  {value: ":"},
  {name: "s"},
  {value: " "},
  {name: "O"}
]).to(['D', 'd', 'M', 'Y', 'H', 'i', 's', 'O']);
graph.add('U', [
  {value: "+date"}
]);

console.log(graph.optimize(['r', 'c', 'c', 'c']));
