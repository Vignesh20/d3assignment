const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
input: fs.createReadStream('Indicators.csv')
});

var counter = 0;
var jArray=[];
var header=[];
var index_countryname,index_indicatorname,index_year,index_value;
rl.on('line', function (line) {

if (counter === 0)
{
 header=line.split(',');


 index_countryname = header.indexOf('CountryName');
 index_indicatorname = header.indexOf('IndicatorName');
 index_year = header.indexOf('Year');
 index_value = header.indexOf('Value');

 counter = 1;
 console.log(header);

}

var final_obj={};
var i=0,j=0;

   var myNewLine=line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);


if((myNewLine[index_countryname] =="India") && ((myNewLine[index_indicatorname] =="Urban population (% of total)")
|| (myNewLine[index_indicatorname] =="Rural population (% of total population)")))
{
  final_obj[header[index_countryname]]=myNewLine[index_countryname];
  final_obj[header[index_indicatorname]]=myNewLine[index_indicatorname];
  final_obj[header[index_value]]=myNewLine[index_value];
  final_obj[header[index_year]]=myNewLine[index_year];
  jArray.push(final_obj);

}
final_obj={};

});

rl.on('close', function (){
 var obj = JSON.stringify(jArray);
 console.log(obj);
 fs.writeFile('population.json',obj);

});
