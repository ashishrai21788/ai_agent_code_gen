import { useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
  useToast,
} from '@chakra-ui/react'
import axios from 'axios'
import { ProjectResponse } from '../types'

interface ProjectFormProps {
  onGenerate: (response: ProjectResponse) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

const ProjectForm = ({ onGenerate, isLoading, setIsLoading }: ProjectFormProps) => {
  const [prompt, setPrompt] = useState('')
  const [projectType, setProjectType] = useState('web')
  const [framework, setFramework] = useState('')
  const [additionalRequirements, setAdditionalRequirements] = useState('')
  const toast = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await axios.post<ProjectResponse>('http://localhost:3001/api/generate', {
        prompt,
        projectType,
        framework,
        additionalRequirements,
      })

      onGenerate(response.data)
    } catch (error) {
      console.error('Error generating project:', error)
      toast({
        title: 'Error',
        description: 'Failed to generate project. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box as="form" onSubmit={handleSubmit} bg="white" p={6} borderRadius="lg" boxShadow="md" height="100%">
      <VStack spacing={6} align="stretch">
        <FormControl isRequired>
          <FormLabel>Project Description</FormLabel>
          <Textarea
            maxW="100%"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe what you want to build..."
            size="lg"
            rows={4}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Project Type</FormLabel>
          <Select
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
            size="lg"
          >
            <option value="web">Web Application</option>
            <option value="mobile">Mobile Application</option>
            <option value="desktop">Desktop Application</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Framework (Optional)</FormLabel>
          <Input
            value={framework}
            onChange={(e) => setFramework(e.target.value)}
            placeholder="e.g., React, Vue, Flutter, etc."
            size="lg"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Additional Requirements (Optional)</FormLabel>
          <Textarea
            value={additionalRequirements}
            onChange={(e) => setAdditionalRequirements(e.target.value)}
            placeholder="Any specific requirements or preferences..."
            size="lg"
            rows={3}
          />
        </FormControl>

        <Button
          type="submit"
          colorScheme="blue"
          size="lg"
          width="100%"
          isLoading={isLoading}
          loadingText="Generating..."
        >
          Generate Project
        </Button>
      </VStack>
    </Box>
  )
}

export default ProjectForm 