class SongRanker {
  constructor(n) {
      this.size = n;
      this.items = [{ item: 0, equals: [] }];
      this.current = { item: 1, try: 0, min: 0, max: 1 };

      this.addAnswer = function (pref) {
              if (pref == -1)
                  this.current.max = this.current.try;
              else
                  this.current.min = this.current.try + 1;
                  
              if (this.current.min == this.current.max) {
                  this.items.splice(this.current.min, 0, { item: this.current.item, equals: [] });
                  this.current = { item: ++this.current.item, try: 0, min: 0, max: this.items.length };
              }
      };

      this.getQuestion = function () {
          if (this.current.item >= this.size)
              return null;
          this.current.try = Math.floor((this.current.min + this.current.max) / 2);
          return ({ a: this.current.item, b: this.items[this.current.try].item });
      };

      this.getOrder = function () {
          let index = [];
          for (var i in this.items) {
              let equal = [this.items[i].item];
              for (var j in this.items[i].equals) {
                  equal.push(this.items[i].equals[j]);
              }
              index.push(equal);
          }
          return (index);
      };
  }
}

function preference(a, b) {
  while (true) {
    const input = prompt("Which song do you like better?\n\n" + "Enter 1 for:    " + a + "\n" + "Enter 2 for:    " + b);
    if (input == 1) {
      return -1;
  }
    else if (input == 2)  {
      return 1;
  }
    else alert('INVALID ANSWER');
      continue;
  }
}

function OrderedList() {
let TrackList = JSON.parse(localStorage.getItem("TrackList"));
let t = new SongRanker(localStorage.getItem("numberOfTracks"));
let q;
while (q = t.getQuestion()) {
  let answer = preference(TrackList[q.a], TrackList[q.b]);
  t.addAnswer(answer);
}

let index = t.getOrder();
let SortedTrackList = [];
for (let i = 0; i < index.length; i++) {
  for (let j = 0; j < index[i].length; j++) {
    SortedTrackList[i] = String(TrackList[index[i][j]])
  }
}
return SortedTrackList;
}

let SortedTrackList = OrderedList();
let list = "<ol>";

for (let i = 0; i < (localStorage.getItem("numberOfTracks")); i++) {
    list += "<li>" + SortedTrackList[i] + "</li>";
}

document.getElementById("albumimage").src = localStorage.getItem("AlbumImage");
document.getElementById("namealbum").innerHTML = localStorage.getItem("AlbumName");
document.getElementById("nameartist").innerHTML = localStorage.getItem("ArtistName");
document.getElementById("description").innerHTML = "Here is your ranked list:";
document.getElementById("arrPrint").innerHTML = list;