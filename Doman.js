const http=require('http');
const qs=require('qs');
const fs=require('fs');

const server=http.createServer((req, res)=>{
    if(req.method==='GET'){
        fs.readFile('./View/Calculator.html',(err, data)=>{
            res.writeHead(200,{'Content-Type':'text-html'});
            res.write(data);
            return res.end();
        })
    }else{
        let data='';
        req.on('data',chunk => {
            data += chunk;
        })
        req.on('end',()=>{
            let result;
            const dataCalculator=qs.parse(data);
            switch (dataCalculator.select){
                case '+':
                    result=+(dataCalculator.firstNumber+dataCalculator.secondNumber);
                    break;
                case '-':
                    result=+(dataCalculator.firstNumber-dataCalculator.secondNumber);
                    break;
                case '*':
                    result=+(dataCalculator.firstNumber*dataCalculator.secondNumber);
                    break;
                case '/':
                    result=+(dataCalculator.firstNumber/dataCalculator.secondNumber);
                    break;
            }
            fs.readFile('./View/Display.html','utf-8',(err,dataResult)=>{
                if(err) console.log(err);
                dataResult=dataResult.replace('{result}',result);
                res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
                res.write(dataResult);
                return res.end();
            })
        })
        req.on('error',()=>{
            console.log('error')
        })
    }
})
server.listen(8080,()=>{
    console.log('server running at localhost:8080')
})

