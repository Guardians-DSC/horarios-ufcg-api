import ImportScheduleService from '../services/ImportScheduleService';
module.exports = {
    async importData(req, res) {
        const { filename } = req.file;

        const importFile = new ImportScheduleService();

        await importFile.execute(filename);

        res.send();
    }
};