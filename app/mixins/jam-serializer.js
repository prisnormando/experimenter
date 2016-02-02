import Ember from 'ember';

/*
Convert JamDB responses to and from models
 */
export default Ember.Mixin.create({
  modelName: null,
  relationAttrs: [],  // List of field names (in JSONAPI attributes) that denote relationships

  keyForAttribute: function(attr, method) {
    // Override the default ember data behavior, so that Jam can use exactly the same keys as in the model (no dasherizing)
    return attr;
  },

  modelNameFromPayloadKey: function(key) {
    // Replace the generic JamDB response type of 'documents' with the name of the model to deserialize as
    return this.modelName || this._super(key);
  },

  payloadKeyFromModelName: function(modelName) {
    // JamDB expects all collections to specify JSONAPI type 'documents'
    return 'documents';
  },

  extractRelationships: function(modelClass, resourceHash) {
    var relationships = this._super(...arguments);
    // Some relationships are stored as ID list under attributes; convert to JSONAPI format
    // TODO: May need serialization for return to server?
    for (var relName of this.relationAttrs) {
      var relData = resourceHash.attributes[relName] || [];
      relationships[relName] = {
        data: relData.map(idVal => ({
            id: idVal,
            type: Ember.Inflector.inflector.singularize(relName), // Must match this.modelName
          }))
      };
    }

    // Manually rebuild the history relationship. This can be removed upon resolution of
    // issue with the auto-generated history link: ticket https://github.com/CenterForOpenScience/jamdb/issues/3
    if (this.modelName !== 'history' && this.modelName !== 'namespace') {
      relationships.history.links.related = 'http://localhost:1212/v1/id/documents/' + resourceHash.id + '/history';
      relationships.history.links.self = relationships.history.links.related;
    }
    return relationships;
  }
});
