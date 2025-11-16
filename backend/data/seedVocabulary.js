const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Vocabulary = require('../models/Vocabulary');
const connectDB = require('../config/database');

dotenv.config();

const vocabularyData = [
  // Greetings
  { german: 'Hallo', english: 'Hello', category: 'greetings', exampleSentence: 'Hallo, wie geht es dir?', pronunciation: 'HAH-loh' },
  { german: 'Guten Morgen', english: 'Good morning', category: 'greetings', exampleSentence: 'Guten Morgen! Wie hast du geschlafen?', pronunciation: 'GOO-ten MOR-gen' },
  { german: 'Guten Tag', english: 'Good day', category: 'greetings', exampleSentence: 'Guten Tag, Frau Schmidt.', pronunciation: 'GOO-ten TAHK' },
  { german: 'Guten Abend', english: 'Good evening', category: 'greetings', exampleSentence: 'Guten Abend! Schön dich zu sehen.', pronunciation: 'GOO-ten AH-bent' },
  { german: 'Gute Nacht', english: 'Good night', category: 'greetings', exampleSentence: 'Gute Nacht, schlaf gut!', pronunciation: 'GOO-te NAKHT' },
  { german: 'Tschüss', english: 'Bye', category: 'greetings', exampleSentence: 'Tschüss! Bis morgen.', pronunciation: 'CHOOS' },
  { german: 'Auf Wiedersehen', english: 'Goodbye', category: 'greetings', exampleSentence: 'Auf Wiedersehen, bis bald!', pronunciation: 'owf VEE-der-zay-en' },
  { german: 'Danke', english: 'Thank you', category: 'greetings', exampleSentence: 'Danke für deine Hilfe!', pronunciation: 'DAHN-keh' },
  { german: 'Bitte', english: 'Please/You\'re welcome', category: 'greetings', exampleSentence: 'Bitte schön!', pronunciation: 'BIT-teh' },

  // Numbers
  { german: 'eins', english: 'one', category: 'numbers', exampleSentence: 'Ich habe eins Apfel.', pronunciation: 'INES' },
  { german: 'zwei', english: 'two', category: 'numbers', exampleSentence: 'Zwei plus zwei ist vier.', pronunciation: 'TSVIE' },
  { german: 'drei', english: 'three', category: 'numbers', exampleSentence: 'Ich habe drei Katzen.', pronunciation: 'DRIE' },
  { german: 'vier', english: 'four', category: 'numbers', exampleSentence: 'Der Tisch hat vier Beine.', pronunciation: 'FEER' },
  { german: 'fünf', english: 'five', category: 'numbers', exampleSentence: 'Ich habe fünf Finger.', pronunciation: 'FUENF' },
  { german: 'sechs', english: 'six', category: 'numbers', exampleSentence: 'Sechs Tage die Woche.', pronunciation: 'ZEKS' },
  { german: 'sieben', english: 'seven', category: 'numbers', exampleSentence: 'Sieben Tage hat eine Woche.', pronunciation: 'ZEE-ben' },
  { german: 'acht', english: 'eight', category: 'numbers', exampleSentence: 'Acht Stunden Schlaf.', pronunciation: 'AKHT' },
  { german: 'neun', english: 'nine', category: 'numbers', exampleSentence: 'Neun Uhr morgens.', pronunciation: 'NOYN' },
  { german: 'zehn', english: 'ten', category: 'numbers', exampleSentence: 'Zehn Euro kosten.', pronunciation: 'TSAYN' },

  // Colors
  { german: 'rot', english: 'red', category: 'colors', exampleSentence: 'Die Rose ist rot.', pronunciation: 'ROHT' },
  { german: 'blau', english: 'blue', category: 'colors', exampleSentence: 'Der Himmel ist blau.', pronunciation: 'BLAU' },
  { german: 'grün', english: 'green', category: 'colors', exampleSentence: 'Das Gras ist grün.', pronunciation: 'GRUEN' },
  { german: 'gelb', english: 'yellow', category: 'colors', exampleSentence: 'Die Sonne ist gelb.', pronunciation: 'GELP' },
  { german: 'schwarz', english: 'black', category: 'colors', exampleSentence: 'Die Nacht ist schwarz.', pronunciation: 'SHVARTS' },
  { german: 'weiß', english: 'white', category: 'colors', exampleSentence: 'Der Schnee ist weiß.', pronunciation: 'VICE' },

  // Family
  { german: 'die Mutter', english: 'mother', category: 'family', exampleSentence: 'Meine Mutter kocht gut.', pronunciation: 'dee MOO-ter' },
  { german: 'der Vater', english: 'father', category: 'family', exampleSentence: 'Mein Vater arbeitet viel.', pronunciation: 'dair FAH-ter' },
  { german: 'die Schwester', english: 'sister', category: 'family', exampleSentence: 'Meine Schwester ist nett.', pronunciation: 'dee SHVES-ter' },
  { german: 'der Bruder', english: 'brother', category: 'family', exampleSentence: 'Mein Bruder spielt Fußball.', pronunciation: 'dair BROO-der' },
  { german: 'die Oma', english: 'grandmother', category: 'family', exampleSentence: 'Meine Oma backt Kuchen.', pronunciation: 'dee OH-ma' },
  { german: 'der Opa', english: 'grandfather', category: 'family', exampleSentence: 'Mein Opa liest gern.', pronunciation: 'dair OH-pa' },

  // Food
  { german: 'das Brot', english: 'bread', category: 'food', exampleSentence: 'Ich esse Brot zum Frühstück.', pronunciation: 'dahs BROHT' },
  { german: 'das Wasser', english: 'water', category: 'food', exampleSentence: 'Ich trinke Wasser.', pronunciation: 'dahs VAH-ser' },
  { german: 'der Apfel', english: 'apple', category: 'food', exampleSentence: 'Der Apfel ist rot.', pronunciation: 'dair AH-pfel' },
  { german: 'die Milch', english: 'milk', category: 'food', exampleSentence: 'Die Milch ist frisch.', pronunciation: 'dee MILKH' },
  { german: 'der Käse', english: 'cheese', category: 'food', exampleSentence: 'Der Käse schmeckt gut.', pronunciation: 'dair KAY-zeh' },
  { german: 'das Ei', english: 'egg', category: 'food', exampleSentence: 'Ich esse ein Ei.', pronunciation: 'dahs AYE' },

  // Common Verbs
  { german: 'sein', english: 'to be', category: 'verbs', exampleSentence: 'Ich bin müde.', pronunciation: 'ZINE' },
  { german: 'haben', english: 'to have', category: 'verbs', exampleSentence: 'Ich habe einen Hund.', pronunciation: 'HAH-ben' },
  { german: 'gehen', english: 'to go', category: 'verbs', exampleSentence: 'Ich gehe zur Schule.', pronunciation: 'GAY-en' },
  { german: 'kommen', english: 'to come', category: 'verbs', exampleSentence: 'Kommst du mit?', pronunciation: 'KO-men' },
  { german: 'essen', english: 'to eat', category: 'verbs', exampleSentence: 'Ich esse gerne Pizza.', pronunciation: 'ES-sen' },
  { german: 'trinken', english: 'to drink', category: 'verbs', exampleSentence: 'Ich trinke Kaffee.', pronunciation: 'TRIN-ken' },
  { german: 'sprechen', english: 'to speak', category: 'verbs', exampleSentence: 'Ich spreche Deutsch.', pronunciation: 'SHPRE-khen' },
  { german: 'lernen', english: 'to learn', category: 'verbs', exampleSentence: 'Ich lerne Deutsch.', pronunciation: 'LAIR-nen' },
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
