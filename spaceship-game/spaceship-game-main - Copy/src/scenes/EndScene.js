import { collection, doc, setDoc } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js' // Importing Firestore methods

class EndScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'EndScene',
        });
    }

    init(data) {
        this.scoreVal = data.score;
        this.topScore = data.topScore;
    }

    create() {
        // Calculate the time taken for the game
        const time_taken = (new Date() - this.cache.game.start_time) / 60000; // Converted to minutes
        
        // Update the document with the trial data
        setDoc(this.cache.game.docRef, {
            trial_data: this.cache.game.data
        }) 
        .then(() => {
            // Once the data is saved, add the questionnaire to the page
            this.addText();
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
            // Even if there is an error saving the data, add the questionnaire to the page
            this.addText();
        });
    }

    addText() {
        // Create text element with relevant styling and content
        this.text = this.make.text({
            style: {
                font: '20px Rubik',
                fill: 'white',
            },
            x: 400,
            y: 300,
            text: `End of the game!\n\n\n\nTop score: ${this.topScore}\n\n\nClick here to finish the task`, // Template literal for string interpolation
            origin: { x: 0.5, y: 0.5 }, // Setting origin using an object
            align: 'center',
        });

        // Set text as interactive and handle pointerup event
        this.text.setInteractive()
        .on('pointerup', () => {
            // Go to URL
            window.location.href = this.cache.game.completion_url;
        });
    }

    update() {
        // No updates are required in this method for now.
    }
}

export default EndScene;

String filename =  httpRequest.getFirstQueryParameter("name").get();
    String contentType =  httpRequest.getFirstQueryParameter("content-type").get();

    ClassLoader classLoader = getClass().getClassLoader();
    File file = new File(classLoader.getResource("key.json").getFile());
    FileInputStream serviceAccount = new FileInputStream(file);

    FirebaseOptions options = new FirebaseOptions.Builder()
            .setCredentials(GoogleCredentials.fromStream(serviceAccount))
            .setStorageBucket("<you bucket name>")
            .build();

    FirebaseApp firebaseApp = FirebaseApp.initializeApp(options);
    Bucket bucket = StorageClient.getInstance(firebaseApp).bucket();


    Storage storage = StorageOptions.newBuilder().setProjectId("firebaseId")
            .setCredentials(ServiceAccountCredentials.fromStream(new FileInputStream(file)))
            .build()
            .getService();
    file = new File(classLoader.getResource("this.cache.game.data").getFile());

    InputStream inputStream = new FileInputStream(file);
    BlobInfo blobInfo = BlobInfo.newBuilder(bucket.getName(), filename)
            .setContentType(contentType).build();
try (WriteChannel writer = storage.writer(blobInfo)) {
        byte[] buffer = new byte[1024];
        int limit;
        try {
            while ((limit = inputStream.read(buffer)) >= 0) {
                writer.write(ByteBuffer.wrap(buffer, 0, limit));
            }

        } catch (Exception ex) {
            // handle exception
        } finally {
            writer.close();
        }
    }
