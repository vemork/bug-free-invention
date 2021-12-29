const Koa = require('koa');
const json = require('koa-json');
const KoaRouter = require('koa-router')
const path = require('path');
const render = require('koa-ejs');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new KoaRouter();

// DB CONNECTION
const things = [
    'Family',
    'Music',
    'Movies',
    'animals'
]

// bodyParser Middleware
app.use(bodyParser());

app.context.user = 'Emmanuel';

// json prettier
app.use(json());

// simple call 
// app.use(async ctx => (ctx.body = { msg: 'Hello World!!!'}));

render(app, {
    root: path.join(__dirname, 'views'),
    layout: 'layout',
    viewExt: 'html',
    cache: false,
    debug: false
});

//Isolate route and render
//ROUTES
router.get('/', index);
router.get('/add', showAdd);
router.post('/add', add);

//List of things
async function index(ctx){
    await ctx.render('index', {
        title: 'Cosas que me gustan',
        things
    });
}

//Show add page
async function showAdd(ctx){
    await ctx.render('add');
}

async function add(ctx){
    const body = ctx.request.body;
    things.push(body.thing);
    ctx.redirect('/');
}

 

//Index (one way)
// router.get('/', async ctx => {
//     await ctx.render('index', {
//         title: 'Cosas que me gustan',
//         things
//     })
// })

router.get('/test', ctx => (ctx.body = `Hello World from test !!! Hello ${ctx.user} `));
router.get('/test2/:name', ctx => (ctx.body = `Hello ${ctx.params.name}`))

//router middleware
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => console.log('Server started ...'));