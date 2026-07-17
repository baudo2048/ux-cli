const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

// Carica le variabili d'ambiente dal file .env
dotenv.config();

const uri = process.env.MONGO_URI;

// Verifichiamo che l'URI sia presente prima di provare a connetterci
if (!uri) {
  console.error("Errore: MONGO_URI non è definito nel file .env");
  process.exit(1);
}

const client = new MongoClient(uri);

async function run() {
  try {
    // Connessione al client Atlas
    await client.connect();
    console.log("Connesso con successo a MongoDB Atlas!");

    // Seleziona il database
    const database = client.db("ux-comp"); // <-- Sostituisci con il nome del tuo DB
    
    // Seleziona la collection
    const collection = database.collection("blog"); // <-- Sostituisci con la tua collection

    // Esegui la query di lettura
    console.log("Recupero dei dati in corso...");
    const cursor = collection.find({}, { limit: 5 });

    // Trasforma i risultati in un array per leggerli facilmente
    const results = await cursor.toArray();

    if (results.length === 0) {
      console.log("La collection è vuota.");
    } else {
      console.log(`Trovati ${results.length} documenti:`);
      console.log(JSON.stringify(results, null, 2));
    }

  } catch (error) {
    console.error("Si è verificato un errore:", error);
  } finally {
    // Assicurati di chiudere sempre la connessione
    await client.close();
    console.log("Connessione chiusa.");
  }
}

run();