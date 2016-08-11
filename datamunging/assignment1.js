const readline = require('readline');
const fs = require('fs');
const rl = readline.createInterface({
input: fs.createReadStream('Indicators.csv')
});
var counter = 0;
var jArray=[];
var header=[];
 var arr=[];
 var ind;
var final_obj={};
var index_countryname,index_indicatorname,index_year,index_value;
var Asian_Country = ["Arab World","East Asia & Pacific (all income levels)","East Asia & Pacific (developing only)",
"South Asia","Afghanistan","Armenia","Azerbaijan","Bahrain","Bangladesh","Bhutan","Brunei Darussalam","Cambodia","China",
"Georgia","Indonesia","Iran, Islamic Rep.","Iraq","Israel","Japan","Jordan","India"];



rl.on('line', function (line) {
if (counter === 0)
{
 header=line.split(',');
 index_countryname = header.indexOf('CountryName');
 index_indicatorname = header.indexOf('IndicatorName');
 index_year = header.indexOf('Year');
 index_value = header.indexOf('Value');
  counter = 1;
}

   var myNewLine=line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

 if((myNewLine[index_countryname] =="India") && ((myNewLine[index_indicatorname] =="Urban population (% of total)") || (myNewLine[index_indicatorname] =="Rural population (% of total population)")))
{

  final_obj[header[index_countryname]]=myNewLine[index_countryname];
  final_obj[header[index_indicatorname]]=myNewLine[index_indicatorname];
  final_obj[header[index_value]]=myNewLine[index_value];
  final_obj[header[index_year]]=myNewLine[index_year];
  jArray.push(final_obj);
}

  final_obj={};



 if((Asian_Country.indexOf(myNewLine[index_countryname])!=-1)&&(myNewLine[index_indicatorname] =="Urban population"||myNewLine[index_indicatorname] =="Rural population"))
 {
   //console.log("+++++++++++++++");

   if(arr.length==0)
   {

     var objj={};
     objj["year"]=myNewLine[index_year];
     //console.log(myNewLine[3]);
     if(myNewLine[index_indicatorname]=="Urban population")
     {
       objj["UP"]=parseFloat(myNewLine[index_value]);
       objj["RP"]=0;

       //console.log(objj);
     }
     else if(myNewLine[index_indicatorname]=="Rural population")
     {
       objj["RP"]=parseFloat(myNewLine[index_value]);
       objj["UP"]=0;


     }
     arr.push(objj);
     //console.log(arr);
   }
   else
   {

     for(ind=0;ind<arr.length;ind++)
     {

       if(arr[ind].year==myNewLine[index_year])
       {
         if(myNewLine[index_indicatorname]=="Urban population")
         {
           arr[ind]["UP"]+=parseFloat(myNewLine[index_value]);
         }
         else if(myNewLine[index_indicatorname]=="Rural population")
         {
           arr[ind]["RP"]+=parseFloat(myNewLine[index_value]);
         }
         break;
       }
     }
     if(ind==arr.length)
     {
       var objj={};
       objj["year"]=myNewLine[index_year];
       if(myNewLine[index_indicatorname]=="Urban population")
       {
         objj["UP"]=parseFloat(myNewLine[index_value]);
         objj["RP"]=0;
       }
       else if(myNewLine[index_indicatorname]=="Rural population")
       {
         objj["RP"]=parseFloat(myNewLine[index_value]);
         objj["UP"]=0;
       }
       arr.push(objj);
     }
   }
 }

});
 rl.on('close', function (){
 var obj = JSON.stringify(jArray);
 console.log(obj);
 fs.writeFile('first.json',obj);


for(ind=0;ind<arr.length;ind++)
{
  arr[ind].RP/=Asian_Country.length;
  arr[ind].UP/=Asian_Country.length;
}

var obj2=JSON.stringify(arr);
 console.log(obj2);
fs.writeFile('second.json',obj2);



});
