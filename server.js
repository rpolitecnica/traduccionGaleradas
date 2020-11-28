const app = express();

app.use(express.static(__dirname+'/dist/traduccionGaleradas'));
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/dist/traduccionGaleradas/index.html'));
});

app.listen(process.env.PORT || 8080);