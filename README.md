# CS208 Full Stack Lab 12.03

## Documentation

- Running the example project is documented [here](docs/example_project.md)
- An example README is provided [here](docs/README_example.md)

## Create the Database Tables

Create the initial tables by running the following command:

```bash
sudo mysql -u root -p < ./setup_scripts/create_demo_table.sql
```

## Install Dependencies

Install the required dependencies using npm:

```bash
npm install
```

## Run the Application

Start the application using the following command:

```bash
npm start
```

## Access the Application

On Codespaces, you can access the application by forwarding port 3000. Open the
forwarded port in your browser to view the application, or if running locally navigate to `http://{your local ip}:3000`.