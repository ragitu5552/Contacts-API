import Contact from '../models/contactSchema.js';

export const getAllContacts = async (req, res) => {
    try {
        const allContacts = await Contact.find({user_id: req.user._id});
        res.status(200).json(allContacts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createContact = async (req, res) => {
    const {name, email, phone} = req.body;
    try {
        const newContact = new Contact({ name, email, phone, user_id: req.user._id });
        await newContact.save();
        res.status(201).json(newContact);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getContact = async (req, res) => {
    const {id} = req.params;
    try {
        const contact = await Contact.findById({_id: id});
        res.status(200).json(contact);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updateContact = async (req, res) => {
    const {id} = req.params;
    const {...data} = req.body;
    try {
        const updatedContact = await Contact.findByIdAndUpdate({_id: id}, {...data}, {new: true});
        res.status(200).json(updatedContact);
    }catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deleteContact = async (req, res) => {
    const {id} = req.params;
    try {
        await Contact.findByIdAndDelete({_id: id});
        res.status(200).json({message: "Contact deleted successfully"});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
