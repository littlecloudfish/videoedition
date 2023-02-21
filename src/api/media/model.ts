class MediaFile {
  public id: string;
  public createAt: Date;
  public updateAt: Date;
  public searchValue: string;
  public fileName: string;
  public subtitleFileName: string;
  public status: string;
  public title: string;
  public originSubtitles: Array<OriginSubtitle>;

  constructor(
    id: string,
    createAt: Date,
    updateAt: Date,
    searchValue: string,
    fileName: string,
    subtitleFileName: string,
    status: string,
    title: string,
    originSubtitles: Array<OriginSubtitle>
  ) {
    this.id = id;
    this.createAt = createAt;
    this.updateAt = updateAt;
    this.searchValue = searchValue;
    this.fileName = fileName;
    this.subtitleFileName = subtitleFileName;
    this.status = status;
    this.title = title;
    this.originSubtitles = originSubtitles;
  }
}

class OriginSubtitle {
  public id: string;
  public createAt: Date;
  public updateAt: Date;
  public searchValue: string;
  public lang: string;
  public text: string;
  public verified: boolean;
  public updated: boolean;
  public deleted: boolean;
  public Index: string;
  public startAt: string;
  public endAt: string;

  constructor(
    id: string,
    createAt: Date,
    updateAt: Date,
    searchValue: string,
    lang: string,
    text: string,
    verified: boolean,
    updated: boolean,
    deleted: boolean,
    Index: string,
    startAt: string,
    endAt: string
  ) {
    this.id = id;
    this.createAt = createAt;
    this.updateAt = updateAt;
    this.searchValue = searchValue;
    this.lang = lang;
    this.text = text;
    this.verified = verified;
    this.updated = updated;
    this.deleted = deleted;
    this.Index = Index;
    this.startAt = startAt;
    this.endAt = endAt;
  }
}

export { MediaFile, OriginSubtitle };
