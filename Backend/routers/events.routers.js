const express = require('express');
const router = express.Router();
const eventsControllers = require('../controllers/events.controllers');

router.post('/', eventsControllers.createEvent);
router.get('/', eventsControllers.getAllEvents);
router.get('/:id', eventsControllers.getEventById);
router.put('/:id', eventsControllers.updateEvent);
router.delete('/:id', eventsControllers.deleteEvent);

router.post('/:id/contacts', eventsControllers.addContact);
router.delete('/:id/contacts/:contactId', eventsControllers.removeContact);

router.post('/:id/register', eventsControllers.registerMember);
router.delete('/:id/register/:memberId', eventsControllers.unregisterMember);

router.post('/:id/uploads', eventsControllers.addUpload);

module.exports = router;