const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Vocabulary = require('../models/Vocabulary');
const connectDB = require('../config/database');

dotenv.config();

const vocabularyData = [
  // Greetings (12 words)
  { german: 'Hallo', english: 'Hello', category: 'greetings', exampleSentence: 'Hallo, wie geht es dir?', pronunciation: 'HAH-loh' },
  { german: 'Guten Morgen', english: 'Good morning', category: 'greetings', exampleSentence: 'Guten Morgen! Wie hast du geschlafen?', pronunciation: 'GOO-ten MOR-gen' },
  { german: 'Guten Tag', english: 'Good day', category: 'greetings', exampleSentence: 'Guten Tag, Frau Schmidt.', pronunciation: 'GOO-ten TAHK' },
  { german: 'Guten Abend', english: 'Good evening', category: 'greetings', exampleSentence: 'Guten Abend! Schön dich zu sehen.', pronunciation: 'GOO-ten AH-bent' },
  { german: 'Gute Nacht', english: 'Good night', category: 'greetings', exampleSentence: 'Gute Nacht, schlaf gut!', pronunciation: 'GOO-te NAKHT' },
  { german: 'Tschüss', english: 'Bye', category: 'greetings', exampleSentence: 'Tschüss! Bis morgen.', pronunciation: 'CHOOS' },
  { german: 'Auf Wiedersehen', english: 'Goodbye', category: 'greetings', exampleSentence: 'Auf Wiedersehen, bis bald!', pronunciation: 'owf VEE-der-zay-en' },
  { german: 'Danke', english: 'Thank you', category: 'greetings', exampleSentence: 'Danke für deine Hilfe!', pronunciation: 'DAHN-keh' },
  { german: 'Bitte', english: 'Please/You\'re welcome', category: 'greetings', exampleSentence: 'Bitte schön!', pronunciation: 'BIT-teh' },
  { german: 'Entschuldigung', english: 'Excuse me/Sorry', category: 'greetings', exampleSentence: 'Entschuldigung, wo ist der Bahnhof?', pronunciation: 'ent-SHOOL-di-goong' },
  { german: 'Ja', english: 'Yes', category: 'greetings', exampleSentence: 'Ja, das ist richtig.', pronunciation: 'YAH' },
  { german: 'Nein', english: 'No', category: 'greetings', exampleSentence: 'Nein, das stimmt nicht.', pronunciation: 'NINE' },

  // Numbers (15 words)
  { german: 'null', english: 'zero', category: 'numbers', exampleSentence: 'Null Probleme!', pronunciation: 'NULL' },
  { german: 'eins', english: 'one', category: 'numbers', exampleSentence: 'Ich habe einen Apfel.', pronunciation: 'INES' },
  { german: 'zwei', english: 'two', category: 'numbers', exampleSentence: 'Zwei plus zwei ist vier.', pronunciation: 'TSVIE' },
  { german: 'drei', english: 'three', category: 'numbers', exampleSentence: 'Ich habe drei Katzen.', pronunciation: 'DRIE' },
  { german: 'vier', english: 'four', category: 'numbers', exampleSentence: 'Der Tisch hat vier Beine.', pronunciation: 'FEER' },
  { german: 'fünf', english: 'five', category: 'numbers', exampleSentence: 'Ich habe fünf Finger.', pronunciation: 'FUENF' },
  { german: 'sechs', english: 'six', category: 'numbers', exampleSentence: 'Sechs Tage die Woche.', pronunciation: 'ZEKS' },
  { german: 'sieben', english: 'seven', category: 'numbers', exampleSentence: 'Sieben Tage hat eine Woche.', pronunciation: 'ZEE-ben' },
  { german: 'acht', english: 'eight', category: 'numbers', exampleSentence: 'Acht Stunden Schlaf.', pronunciation: 'AKHT' },
  { german: 'neun', english: 'nine', category: 'numbers', exampleSentence: 'Neun Uhr morgens.', pronunciation: 'NOYN' },
  { german: 'zehn', english: 'ten', category: 'numbers', exampleSentence: 'Zehn Euro kosten.', pronunciation: 'TSAYN' },
  { german: 'elf', english: 'eleven', category: 'numbers', exampleSentence: 'Es ist elf Uhr.', pronunciation: 'ELF' },
  { german: 'zwölf', english: 'twelve', category: 'numbers', exampleSentence: 'Zwölf Monate im Jahr.', pronunciation: 'TSVULF' },
  { german: 'zwanzig', english: 'twenty', category: 'numbers', exampleSentence: 'Ich bin zwanzig Jahre alt.', pronunciation: 'TSVAN-tsikh' },
  { german: 'hundert', english: 'hundred', category: 'numbers', exampleSentence: 'Hundert Prozent!', pronunciation: 'HOON-dert' },

  // Colors (10 words)
  { german: 'rot', english: 'red', category: 'colors', exampleSentence: 'Die Rose ist rot.', pronunciation: 'ROHT' },
  { german: 'blau', english: 'blue', category: 'colors', exampleSentence: 'Der Himmel ist blau.', pronunciation: 'BLAU' },
  { german: 'grün', english: 'green', category: 'colors', exampleSentence: 'Das Gras ist grün.', pronunciation: 'GRUEN' },
  { german: 'gelb', english: 'yellow', category: 'colors', exampleSentence: 'Die Sonne ist gelb.', pronunciation: 'GELP' },
  { german: 'schwarz', english: 'black', category: 'colors', exampleSentence: 'Die Nacht ist schwarz.', pronunciation: 'SHVARTS' },
  { german: 'weiß', english: 'white', category: 'colors', exampleSentence: 'Der Schnee ist weiß.', pronunciation: 'VICE' },
  { german: 'braun', english: 'brown', category: 'colors', exampleSentence: 'Der Baum ist braun.', pronunciation: 'BROWN' },
  { german: 'grau', english: 'gray', category: 'colors', exampleSentence: 'Die Wolken sind grau.', pronunciation: 'GROW' },
  { german: 'rosa', english: 'pink', category: 'colors', exampleSentence: 'Das Kleid ist rosa.', pronunciation: 'ROH-zah' },
  { german: 'orange', english: 'orange', category: 'colors', exampleSentence: 'Die Orange ist orange.', pronunciation: 'oh-RAHN-zhə' },

  // Family (8 words)
  { german: 'die Mutter', article: 'die', english: 'mother', category: 'family', exampleSentence: 'Meine Mutter kocht gut.', pronunciation: 'dee MOO-ter' },
  { german: 'der Vater', article: 'der', english: 'father', category: 'family', exampleSentence: 'Mein Vater arbeitet viel.', pronunciation: 'dair FAH-ter' },
  { german: 'die Schwester', article: 'die', english: 'sister', category: 'family', exampleSentence: 'Meine Schwester ist nett.', pronunciation: 'dee SHVES-ter' },
  { german: 'der Bruder', article: 'der', english: 'brother', category: 'family', exampleSentence: 'Mein Bruder spielt Fußball.', pronunciation: 'dair BROO-der' },
  { german: 'die Oma', article: 'die', english: 'grandmother', category: 'family', exampleSentence: 'Meine Oma backt Kuchen.', pronunciation: 'dee OH-ma' },
  { german: 'der Opa', article: 'der', english: 'grandfather', category: 'family', exampleSentence: 'Mein Opa liest gern.', pronunciation: 'dair OH-pa' },
  { german: 'das Kind', article: 'das', english: 'child', category: 'family', exampleSentence: 'Das Kind spielt im Garten.', pronunciation: 'dahs KINT' },
  { german: 'die Familie', article: 'die', english: 'family', category: 'family', exampleSentence: 'Die Familie isst zusammen.', pronunciation: 'dee fah-MEE-lee-ə' },

  // Food (15 words)
  { german: 'das Brot', article: 'das', english: 'bread', category: 'food', exampleSentence: 'Ich esse Brot zum Frühstück.', pronunciation: 'dahs BROHT' },
  { german: 'das Wasser', article: 'das', english: 'water', category: 'food', exampleSentence: 'Ich trinke Wasser.', pronunciation: 'dahs VAH-ser' },
  { german: 'der Apfel', article: 'der', english: 'apple', category: 'food', exampleSentence: 'Der Apfel ist rot.', pronunciation: 'dair AH-pfel' },
  { german: 'die Milch', article: 'die', english: 'milk', category: 'food', exampleSentence: 'Die Milch ist frisch.', pronunciation: 'dee MILKH' },
  { german: 'der Käse', article: 'der', english: 'cheese', category: 'food', exampleSentence: 'Der Käse schmeckt gut.', pronunciation: 'dair KAY-zeh' },
  { german: 'das Ei', article: 'das', english: 'egg', category: 'food', exampleSentence: 'Ich esse ein Ei.', pronunciation: 'dahs AYE' },
  { german: 'der Kuchen', article: 'der', english: 'cake', category: 'food', exampleSentence: 'Der Kuchen ist lecker.', pronunciation: 'dair KOO-khen' },
  { german: 'der Kaffee', article: 'der', english: 'coffee', category: 'food', exampleSentence: 'Ich trinke Kaffee.', pronunciation: 'dair kah-FEY' },
  { german: 'der Tee', article: 'der', english: 'tea', category: 'food', exampleSentence: 'Möchten Sie Tee?', pronunciation: 'dair TAY' },
  { german: 'das Fleisch', article: 'das', english: 'meat', category: 'food', exampleSentence: 'Das Fleisch ist gut.', pronunciation: 'dahs FLYSH' },
  { german: 'der Fisch', article: 'der', english: 'fish', category: 'food', exampleSentence: 'Der Fisch schwimmt.', pronunciation: 'dair FISH' },
  { german: 'das Gemüse', article: 'das', english: 'vegetables', category: 'food', exampleSentence: 'Ich esse Gemüse.', pronunciation: 'dahs gə-MYU-zə' },
  { german: 'das Obst', article: 'das', english: 'fruit', category: 'food', exampleSentence: 'Obst ist gesund.', pronunciation: 'dahs OHPST' },
  { german: 'die Butter', article: 'die', english: 'butter', category: 'food', exampleSentence: 'Die Butter ist weich.', pronunciation: 'dee BOO-ter' },
  { german: 'der Zucker', article: 'der', english: 'sugar', category: 'food', exampleSentence: 'Der Zucker ist süß.', pronunciation: 'dair TSOO-ker' },

  // Verbs (20 words)
  { german: 'sein', english: 'to be', category: 'verbs', exampleSentence: 'Ich bin müde.', pronunciation: 'ZINE' },
  { german: 'haben', english: 'to have', category: 'verbs', exampleSentence: 'Ich habe einen Hund.', pronunciation: 'HAH-ben' },
  { german: 'gehen', english: 'to go', category: 'verbs', exampleSentence: 'Ich gehe zur Schule.', pronunciation: 'GAY-en' },
  { german: 'kommen', english: 'to come', category: 'verbs', exampleSentence: 'Kommst du mit?', pronunciation: 'KO-men' },
  { german: 'essen', english: 'to eat', category: 'verbs', exampleSentence: 'Ich esse gerne Pizza.', pronunciation: 'ES-sen' },
  { german: 'trinken', english: 'to drink', category: 'verbs', exampleSentence: 'Ich trinke Kaffee.', pronunciation: 'TRIN-ken' },
  { german: 'sprechen', english: 'to speak', category: 'verbs', exampleSentence: 'Ich spreche Deutsch.', pronunciation: 'SHPRE-khen' },
  { german: 'lernen', english: 'to learn', category: 'verbs', exampleSentence: 'Ich lerne Deutsch.', pronunciation: 'LAIR-nen' },
  { german: 'machen', english: 'to make/do', category: 'verbs', exampleSentence: 'Was machst du?', pronunciation: 'MAHK-hen' },
  { german: 'sehen', english: 'to see', category: 'verbs', exampleSentence: 'Ich sehe dich.', pronunciation: 'ZAY-en' },
  { german: 'hören', english: 'to hear', category: 'verbs', exampleSentence: 'Ich höre Musik.', pronunciation: 'HUR-en' },
  { german: 'lesen', english: 'to read', category: 'verbs', exampleSentence: 'Ich lese ein Buch.', pronunciation: 'LAY-zen' },
  { german: 'schreiben', english: 'to write', category: 'verbs', exampleSentence: 'Ich schreibe einen Brief.', pronunciation: 'SHRY-ben' },
  { german: 'arbeiten', english: 'to work', category: 'verbs', exampleSentence: 'Ich arbeite hier.', pronunciation: 'AR-by-ten' },
  { german: 'spielen', english: 'to play', category: 'verbs', exampleSentence: 'Die Kinder spielen.', pronunciation: 'SHPEE-len' },
  { german: 'wohnen', english: 'to live', category: 'verbs', exampleSentence: 'Ich wohne in Berlin.', pronunciation: 'VOH-nen' },
  { german: 'kaufen', english: 'to buy', category: 'verbs', exampleSentence: 'Ich kaufe Brot.', pronunciation: 'KOW-fen' },
  { german: 'helfen', english: 'to help', category: 'verbs', exampleSentence: 'Kannst du mir helfen?', pronunciation: 'HEL-fen' },
  { german: 'fragen', english: 'to ask', category: 'verbs', exampleSentence: 'Ich frage dich.', pronunciation: 'FRAH-gen' },
  { german: 'antworten', english: 'to answer', category: 'verbs', exampleSentence: 'Bitte antworten Sie.', pronunciation: 'ANT-vor-ten' },

  // Animals (10 words)
  { german: 'der Hund', article: 'der', english: 'dog', category: 'animals', exampleSentence: 'Der Hund bellt.', pronunciation: 'dair HOONT' },
  { german: 'die Katze', article: 'die', english: 'cat', category: 'animals', exampleSentence: 'Die Katze schläft.', pronunciation: 'dee KAH-tsə' },
  { german: 'der Vogel', article: 'der', english: 'bird', category: 'animals', exampleSentence: 'Der Vogel singt.', pronunciation: 'dair FOH-gel' },
  { german: 'das Pferd', article: 'das', english: 'horse', category: 'animals', exampleSentence: 'Das Pferd läuft schnell.', pronunciation: 'dahs PFAIRT' },
  { german: 'die Kuh', article: 'die', english: 'cow', category: 'animals', exampleSentence: 'Die Kuh gibt Milch.', pronunciation: 'dee KOO' },
  { german: 'das Schwein', article: 'das', english: 'pig', category: 'animals', exampleSentence: 'Das Schwein ist rosa.', pronunciation: 'dahs SHVINE' },
  { german: 'die Maus', article: 'die', english: 'mouse', category: 'animals', exampleSentence: 'Die Maus ist klein.', pronunciation: 'dee MOWS' },
  { german: 'der Elefant', article: 'der', english: 'elephant', category: 'animals', exampleSentence: 'Der Elefant ist groß.', pronunciation: 'dair ay-lay-FAHNT' },
  { german: 'der Löwe', article: 'der', english: 'lion', category: 'animals', exampleSentence: 'Der Löwe brüllt.', pronunciation: 'dair LUR-və' },
  { german: 'der Fisch', article: 'der', english: 'fish', category: 'animals', exampleSentence: 'Der Fisch schwimmt.', pronunciation: 'dair FISH' },

  // Body Parts (10 words)
  { german: 'der Kopf', article: 'der', english: 'head', category: 'body', exampleSentence: 'Mein Kopf tut weh.', pronunciation: 'dair KOPF' },
  { german: 'das Auge', article: 'das', english: 'eye', category: 'body', exampleSentence: 'Das Auge ist blau.', pronunciation: 'dahs OW-gə' },
  { german: 'die Nase', article: 'die', english: 'nose', category: 'body', exampleSentence: 'Die Nase ist rot.', pronunciation: 'dee NAH-zə' },
  { german: 'der Mund', article: 'der', english: 'mouth', category: 'body', exampleSentence: 'Der Mund ist groß.', pronunciation: 'dair MOONT' },
  { german: 'die Hand', article: 'die', english: 'hand', category: 'body', exampleSentence: 'Die Hand ist klein.', pronunciation: 'dee HAHNT' },
  { german: 'der Fuß', article: 'der', english: 'foot', category: 'body', exampleSentence: 'Der Fuß tut weh.', pronunciation: 'dair FOOS' },
  { german: 'das Bein', article: 'das', english: 'leg', category: 'body', exampleSentence: 'Das Bein ist lang.', pronunciation: 'dahs BINE' },
  { german: 'der Arm', article: 'der', english: 'arm', category: 'body', exampleSentence: 'Der Arm ist stark.', pronunciation: 'dair ARM' },
  { german: 'das Ohr', article: 'das', english: 'ear', category: 'body', exampleSentence: 'Das Ohr hört gut.', pronunciation: 'dahs OHR' },
  { german: 'das Haar', article: 'das', english: 'hair', category: 'body', exampleSentence: 'Das Haar ist lang.', pronunciation: 'dahs HAHR' },
];

const seedVocabulary = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Vocabulary.deleteMany({});
    console.log('Cleared existing vocabulary');

    // Insert new data
    await Vocabulary.insertMany(vocabularyData);
    console.log(`Added ${vocabularyData.length} vocabulary words`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding vocabulary:', error);
    process.exit(1);
  }
};

seedVocabulary();
