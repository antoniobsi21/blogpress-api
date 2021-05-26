const express = require('express');
const router = express.Router();
const Article = require('./Article');
const slugify = require('slugify');
const Category = require('../categories/Category');

router.get('/', async (req, res) => {
    try{
        let categories = await Article.findAll();

        res.json(categories);
    } catch(error) {
        res.json({error});
    }
});

router.get('/:id', async (req, res) => {
    let id = req.params.id;

    if(id == undefined || isNaN(id)) {
        res.status(400);
        res.json({
            error: 'Invalid id'
        });
    } else {
        let article = await Article.findOne({
            where: {
                id
            }
        });
        if(article == undefined) {
            res.status(404);
            res.json({
                error: `Article with id ${id} doesn't exist.`
            });
        } else {
            res.status(200);
            res.json(article);
        }
    }
});

router.post('/', async(req, res) => {
    let { title, body, categoryId } = req.body;

    if(title == undefined || title == '' || categoryId == undefined || categoryId == '' || isNaN(categoryId)) {
        res.status(400);
        res.json({
            error: 'Title or categoryId invalid'
        });
    } else {
        // Check if the given categoryId exists
        let category = undefined;
        category = await Category.findOne({where: { id: categoryId }});

        if(category == undefined) {
            res.status(404);
            res.json({
                error: `Category with id ${categoryId} doesn't exists`
            });
        } else {
            let slug = slugify(title);
            let articleBySlug = await Article.findOne({
                where: {
                    slug
                }
            });
            if(articleBySlug == undefined) {
                Article.create({
                    title,
                    slug,
                    body,
                    categoryId
                }).then((article) => {
                    res.status(201);
                    res.json(article.get({
                        plain: true
                    }));
                }).catch(error => {
                    console.log(error);
                    res.sendStatus(500);
                })
            } else {
                res.status(409);
                res.json({
                    error: 'Already exists a article with similar title (same slug)'
                });
            }
        }
    }
});

// router.patch('/:id', async (req, res) => {
//     let id = req.params.id;

//     if(id == '' || isNaN(id)) {
//         res.status(400);
//         res.json({
//             error: 'Invalid id'
//         });
//     } else {
//         let { title } = req.body;
//         if(title == undefined || title == '') {
//             res.status(400);
//             res.json({
//                 error: 'Invalid title'
//             });
//         } else {
//             let article = await Article.findOne({ where: {id} });

//             if(article == undefined) {
//                 res.status(404);
//                 res.json({
//                     error: `Article with id ${id} not found`
//                 });
//             } else {                 
//                 let getArticleBySlug = undefined;

//                 getArticleBySlug = await Article.findOne({ where: {slug: slugify(title)}});

//                 if(getArticleBySlug == undefined){ 
//                     article.title = title;
//                     article.slug = slugify(title);
                
//                     article.save();
//                     res.json({
//                         article
//                     });   
//                 } else {
//                     res.status(409);
//                     res.json({
//                         error: 'Already exists a article with similar title (same slug)'
//                     });
//                 }
//             }                
//         }
//     }
// });

module.exports = router;