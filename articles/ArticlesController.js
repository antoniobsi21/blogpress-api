const express = require('express');
const router = express.Router();
const Article = require('./Article');
const slugify = require('slugify');
const Category = require('../categories/Category');

router.get('/', async (req, res) => {
    try{
        
        let categories = await Article.findAll();

        return res.json(categories);
    } catch(error) {
        return res.json({error});
    }
});

router.get('/:id', async (req, res) => {
    let id = req.params.id;

    if(id == undefined || isNaN(id)) {
        res.status(400);
        return res.json({
            error: 'Invalid id'
        });
    }
    let article = await Article.findOne({
        where: {
            id
        }
    });
    if(article == undefined) {
        res.status(404);
        return res.json({
            error: `Article with id ${id} doesn't exist.`
        });
    }
    res.status(200);
    return res.json(article);
});

router.post('/', async(req, res) => {
    let { title, body, categoryId } = req.body;

    if(title == undefined || title == '' || categoryId == undefined || categoryId == '' || isNaN(categoryId)) {
        res.status(400);
        return res.json({
            error: 'Title or categoryId invalid'
        });
    }
    // Check if the given categoryId exists
    let category = undefined;
    category = await Category.findOne({where: { id: categoryId }});

    if(category == undefined) {
        res.status(404);
        return res.json({
            error: `Category with id ${categoryId} doesn't exists`
        });
    }
    let slug = slugify(title);
    let articleBySlug = await Article.findOne({
        where: {
            slug
        }
    });
    if(articleBySlug == undefined) {
        body = (body == undefined) ? '' : body;
        Article.create({
            title,
            slug,
            body,
            categoryId
        }).then((article) => {
            res.status(201);
            return res.json(article.get({
                plain: true
            }));
        }).catch(error => {
            console.log(error);
            return res.sendStatus(500);
        })
    } else {
        res.status(409);
        return res.json({
            error: 'Already exists a article with similar title (same slug)'
        });
    }
});

router.patch('/:id', async (req, res) => {
    let id = req.params.id;

    if(isNaN(id)) {
        res.status(400);
        return res.json({
            error: 'Invalid id'
        });
    }
    let article = await Article.findOne({ where: {id} });
    
    if(article == undefined) {
        res.status(404);
        return res.json({
            error: `There's no Article with id ${id}`
        });
    }
    let { title, body, categoryId } = req.body;

    if(title != undefined) {
        if(title == '') {
            res.status(400);
            return res.json({
                error: 'Invalid title'
            });
        }
        let slug = slugify(title);
        let articleBySlug = await Article.findOne({where: { slug }});
        if(articleBySlug != undefined) {
            res.status(409);
            return res.json({
                error: 'Already exists a article with similar title (same slug)'
            });
        }
        article.title = title;
        article.slug = slug;
    }

    if(categoryId != undefined) {
        if(isNaN(categoryId)) {
            res.status(400);
            return res.json({
                error: 'Invalid category'
            });
        }
        let getCategoryByCategoryId = await Category.findOne({where: {id: categoryId}});

        if(getCategoryByCategoryId == undefined) {
            res.status(404);
            return res.json({
                error: `There's no Category with id ${categoryId}`
            })
        }
        article.categoryId = categoryId;
    }
    article.body = (body != undefined) ? body : article.body;
    
    article.save();
    res.status(200);
    return res.json(article.get({plain: true}));
});

module.exports = router;