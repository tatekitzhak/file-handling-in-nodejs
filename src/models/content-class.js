const mongoose = require( 'mongoose' );
const { Schema } = require( 'mongoose' );
const uniqueValidator = require( 'mongoose-unique-validator' );
const slugify = require( 'slugify' );

class Content {

    initSchema() {
        const schema = new Schema( {
            'title': {
                'type': String,
                'required': true,
            },
            'slug': String,
            'subtitle': {
                'type': String,
                'required': false,
            },
            'description': {
                'type': String,
                'required': false,
            },
            'content': {
                'type': String,
                'required': true,
            }
        }, { 'timestamps': true } );

        schema.pre( 'save', function( next ) {
            const content = this;

            if ( !content.isModified( 'title' ) ) {
                return next();
            }
            content.slug = slugify( content.title, '_' );
            console.log( 'set slug', content.slug );
            return next();
        } );

        schema.plugin( uniqueValidator );

        try {
            mongoose.model( 'Content', schema );
        } catch ( e ) {

        }
    };

    getInstance() {
        this.initSchema();
        return mongoose.model( 'Content' );
    };
};

module.exports = { Content };