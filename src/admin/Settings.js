import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Settings = () => {
    const [selectedTemplate, setSelectedTemplate] = useState('classic');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchCurrentTemplate();
    }, []);

    const fetchCurrentTemplate = async () => {
        try {
            const response = await axios.get('/wp-json/stw/v1/settings/template');
            setSelectedTemplate(response.data.template);
        } catch (error) {
            console.error('Error fetching template:', error);
        }
    };

    const handleTemplateChange = async (template) => {
        setLoading(true);
        try {
            await axios.post('/wp-json/stw/v1/settings/template', {
                template: template
            });
            setSelectedTemplate(template);
            setMessage('Template updated successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            setMessage('Error updating template. Please try again.');
        }
        setLoading(false);
    };

    return (
        <div className="stw-settings-page">
            <h2>Wheel Template Settings</h2>
            <div className="stw-template-selector">
                <div className="stw-template-option">
                    <input
                        type="radio"
                        id="classic"
                        name="template"
                        value="classic"
                        checked={selectedTemplate === 'classic'}
                        onChange={(e) => handleTemplateChange(e.target.value)}
                    />
                    <label htmlFor="classic">
                        <h3>Classic Template</h3>
                        <div className="stw-template-preview classic"></div>
                    </label>
                </div>

                <div className="stw-template-option">
                    <input
                        type="radio"
                        id="modern"
                        name="template"
                        value="modern"
                        checked={selectedTemplate === 'modern'}
                        onChange={(e) => handleTemplateChange(e.target.value)}
                    />
                    <label htmlFor="modern">
                        <h3>Modern Template</h3>
                        <div className="stw-template-preview modern"></div>
                    </label>
                </div>
            </div>

            {loading && <p>Saving changes...</p>}
            {message && <p className="stw-message">{message}</p>}
        </div>
    );
};

export default Settings;