// import React, { useState } from 'react';
// import { postItemToFirebase } from '../lib/firestoreService';
// import { ItemDataForFirestore } from '../lib/types';
//
// const MyFormComponent: React.FC = () => {
//     const [title, setTitle] = useState('');
//     const [date, setDate] = useState('');
//     const [content, setContent] = useState('');
//     const [imgLink, setImgLink] = useState('');
//     const [loading, setLoading] = useState(false); // Add loading state
//     const [message, setMessage] = useState(''); // Add message state for feedback
//
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setLoading(true);
//         setMessage('');
//
//         const newItemData: ItemDataForFirestore = { // Use ItemDataForFirestore
//             title,
//             date,
//             content,
//             imgLink,
//         };
//
//         try {
//             const docId = await postItemToFirebase(newItemData);
//             setMessage(`Item posted successfully with ID: ${docId}`);
//             // Clear form
//             setTitle('');
//             setDate('');
//             setContent('');
//             setImgLink('');
//         } catch (error) {
//             console.error('Error submitting item:', error); // Log the full error
//             setMessage(`Failed to post item. Error: ${(error as Error).message}`); // Display error to user
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     return (
//         <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
//             <h2>Add New Item</h2>
//             <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
//             <input type="date" value={date} onChange={(e) => setDate(e.target.value)} placeholder="Date" required /> {/* Consider using type="date" for actual dates */}
//             <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" rows={5} required></textarea>
//             <input type="url" value={imgLink} onChange={(e) => setImgLink(e.target.value)} placeholder="Image Link (URL)" />
//             <button type="submit" disabled={loading}>
//                 {loading ? 'Adding...' : 'Add Item'}
//             </button>
//             {message && <p style={{ color: message.includes('successfully') ? 'green' : 'red' }}>{message}</p>}
//         </form>
//     );
// };
//
// export default MyFormComponent;