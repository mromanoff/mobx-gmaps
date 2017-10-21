import {action, observable} from 'mobx';

export default class ProviderModel {
  @observable isFavorite;

  constructor(store, provider) {
    this.store = store;
    this.id = provider.id;
    this.isFavorite = provider.isFavorite;
    this.name = provider.name;
    this.title = provider.title;
    this.degree = provider.degree;
    this.school = provider.school;
    this.age = provider.age;
    this.phone = provider.phone;
    this.gender = provider.gender;
    this.distance = provider.distance;
    this.highlights = provider.highlights;
    this.photoUrl = provider.photoUrl;
    this.statementSentences = provider.statementSentences;
    this.priceInformation = provider.priceInformation;
    this.addresses = provider.addresses;
    this.irrelevantIssues = provider.irrelevantIssues;
    this.relevantIssues = provider.relevantIssues;
    this.styles = provider.styles;
    this.isInNetwork = provider.isInNetwork;
  }

  @action
  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }

  save() {
    this.store.fetchOneAndUpdate(this.id, this.toJS());
  }

  toJS() {
    return {
      id: this.id,
      isFavorite: this.isFavorite,
      name: this.name,
      title: this.title,
      degree: this.degree,
      school: this.school,
      age: this.age,
      phone: this.phone,
      gender: this.gender,
      distance: this.distance,
      highlights: this.highlights,
      photoUrl: this.photoUrl,
      statementSentences: this.statementSentences,
      priceInformation: this.priceInformation,
      addresses: this.addresses,
      irrelevantIssues: this.irrelevantIssues,
      relevantIssues: this.relevantIssues,
      styles: this.styles,
      isInNetwork: this.isInNetwork,
    };
  }

  static fromJS(store, provider) {
    return new ProviderModel(store, provider);
  }
}
