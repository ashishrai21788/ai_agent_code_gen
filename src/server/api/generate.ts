import { Request, Response } from 'express'
import OpenAI from 'openai'
import { ProjectRequest, ProjectResponse } from '../../types/index'
import dotenv from 'dotenv'
import path from 'path'

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../../.env') })

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const generateCode = async (req: Request, res: Response) => {
  try {
    const { prompt, projectType, framework, additionalRequirements } = req.body as ProjectRequest
    console.log('Received request:', { prompt, projectType, framework, additionalRequirements })

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are an AI coding assistant. Generate a complete project structure based on the user's requirements.
            For web projects, always include an index.html file as the main entry point.
            The index.html file should be the first file in the files array.
            use proper html and css for the index.html file with fully styled components.
            Return the response in JSON format with the following structure:
            {
              "files": [
                {
                  "name": "filename",
                  "content": "file content",
                  "path": "file path"
                }
              ],
              "instructions": "setup instructions",
              "dependencies": ["dependency1", "dependency2"]
            }
            Make sure the response is valid JSON and all fields are properly formatted.`
        },
        {
          role: 'user',
          content: `Create a ${projectType} application${framework ? ` using ${framework}` : ''}.
            Requirements: ${prompt}
            ${additionalRequirements ? `Additional requirements: ${additionalRequirements}` : ''}
            ${projectType === 'web' ? 'Make sure to include an index.html file as the main entry point with proper HTML structure.' : ''}`
        }
      ],
      temperature: 0.7,
    })

    console.log('OpenAI response:', completion.choices[0].message.content)

    let response: ProjectResponse
    try {
      response = JSON.parse(completion.choices[0].message.content || '{}') as ProjectResponse
      console.log('Parsed response:', response)
    } catch (parseError) {
      console.error('Error parsing OpenAI response:', parseError)
      throw new Error('Invalid response format from OpenAI')
    }

    // Validate the response structure
    if (!response.files || !Array.isArray(response.files)) {
      throw new Error('Invalid response: files array is missing or invalid')
    }

    // Ensure index.html exists for web projects
    if (projectType === 'web' && !response.files.some((file: { name: string }) => file.name === 'index.html')) {
      console.warn('No index.html found, adding default one')
      response.files.unshift({
        name: 'index.html',
        content: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Project</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to Your Generated Project</h1>
        <p>This is a placeholder index.html file. Your project has been generated successfully!</p>
    </div>
</body>
</html>`,
        path: 'index.html'
      })
    }

    res.status(200).json(response)
  } catch (error) {
    console.error('Error generating code:', error)
    res.status(500).json({ 
      error: 'Failed to generate code',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
} 