const express = require('express');
const router = express.Router();
const Category = require('./Category');
const Article = require('../articles/Article');
const slugify = require('slugify');

router.get('/', async (req, res) => {
    try{
        let categories = await Category.findAll();

        res.json(categories);
    } catch(error) {
        res.json({error});
    }
});

router.get('/:id/articles', async (req, res) => {
    // This route can lead to some unpredictable behaviors like, category 1 is deleted but still exists articles with that category
    // and thus this route will return status code 404.
    let id = req.params.id;

    if(id == undefined || isNaN(id)) {
        res.status(400);
        return res.json({
            error: 'Invalid id'
        });
    }

    let articles = await Article.findAll({
        where: {
            categoryId: id
        }
    });
    let category = await Category.findOne({
        where: {
            id
        }
    });
    if(category == undefined) {
        res.status(404);
        return res.json({
            error: `Category with id ${id} doesn't exist.`
        })
    }
    res.status(200);
    return res.json({category, articles});
});

router.get('/:id', async (req, res) => {
    let id = req.params.id;

    if(id == undefined || isNaN(id)) {
        res.status(400);
        return res.json({
            error: 'Invalid id'
        });
    }

    let category = await Category.findOne({
        where: {
            id
        }
    });
    if(category == undefined) {
        res.status(404);
        return res.json({
            error: `Category with id ${id} doesn't exist.`
        });
    } else {
        res.status(200);
        return res.json(category);
    }
});

router.post('/', async(req, res) => {
    let { title } = req.body;

    if(title == undefined || title == '') {
        res.status(400);
        res.json({
            error: 'Title invalid'
        });
    } else {
        let slug = slugify(title);
        let category = await Category.findOne({
            where: {
                slug
            }
        });
        if(category == undefined) {
            Category.create({
                title,
                slug
            }).then((category) => {
                res.status(201);
                res.json(category.get({
                    plain: true
                }));
            }).catch(error => {
                console.log(error);
                res.sendStatus(500);
            })
        } else {
            res.status(409);
            res.json({
                error: 'Already exists a category with similar title (same slug)'
            });
        }
    }
});

router.patch('/:id', async (req, res) => {
    let id = req.params.id;

    if(id == '' || isNaN(id)) {
        res.status(400);
        res.json({
            error: 'Invalid id'
        });
    } else {
        let { title } = req.body;
        if(title == undefined || title == '') {
            res.status(400);
            res.json({
                error: 'Invalid title'
            });
        } else {
            let category = await Category.findOne({ where: {id} });

            if(category == undefined) {
                res.status(404);
                res.json({
                    error: `Category with id ${id} not found`
                });
            } else {                 
                let getCategoryBySlug = undefined;

                getCategoryBySlug = await Category.findOne({ where: {slug: slugify(title)}});

                if(getCategoryBySlug == undefined){ 
                    category.title = title;
                    category.slug = slugify(title);
                
                    category.save();
                    res.json({
                        category
                    });   
                } else {
                    res.status(409);
                    res.json({
                        error: 'Already exists a category with similar title (same slug)'
                    });
                }
            }                
        }
    }
});

module.exports = router;