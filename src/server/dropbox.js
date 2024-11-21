'use server'

import axios from "axios"

const DROPBOX_APP_ID = process.env.DROPBOX_APP_ID
const DROPBOX_APP_SECRET = process.env.DROPBOX_APP_SECRET
const DROPBOX_REFRESH_TOKEN = process.env.DROPBOX_REFRESH_TOKEN

// Deletar pasta de cliente
export async function deleteFolder(clientId) {
    const folderName = `client-${clientId}`

    try {
        const token = await getShortLiveToken()

        if (await clientFolderExists(token, clientId)) {
            axios.post(
                "https://api.dropboxapi.com/2/files/delete_v2",
                JSON.stringify({ path: `/${folderName}` }),
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            )
        }

        return JSON.stringify({ ok: true, message: 'Pasta deletada com sucesso!' })
    } catch (error) {
        return JSON.stringify({ ok: false, error })
    }
}

// Deletar arquivo em pasta
export async function deleteFile(path) {
    try {
        const token = await getShortLiveToken()

        axios.post(
            'https://api.dropboxapi.com/2/files/delete_v2',
            JSON.stringify({ path }),
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        )

        return JSON.stringify({ ok: true, message: 'Arquivo deletado com sucesso!' })
    } catch (error) {
        console.log(error)
        throw new Error('Erro ao deletar arquivo')
    }
}

// Envio de arquivo para pasta
export async function uploadFile(clientId, formData) {
    const folderName = `client-${clientId}`

    try {
        const token = await getShortLiveToken()

        const file = formData.get('file')
        const fileData = Buffer.from(await file.arrayBuffer())
        const fileSize = file.size

        const chunkSize = 150 * 1024 * 1024
        const totalChunks = Math.ceil(file.size / chunkSize)

        if (! await clientFolderExists(token, clientId)) {
            console.log(`[DROPBOX] Criando pasta ${folderName}`)
            await createClientFolder(token, clientId)
        }

        // Iniciar sessão de upload
        const responseStart = await axios.post(
            'https://content.dropboxapi.com/2/files/upload_session/start', null, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/octet-stream'
                }
            }
        )

        const sessionId = responseStart.data.session_id

        // Upload das partes do arquivo
        let cursor = 0
        let chunkIndex = 0

        while (cursor < fileSize) {
            const chunk = fileData.slice(cursor, cursor + chunkSize)

            await axios.post(
                'https://content.dropboxapi.com/2/files/upload_session/append_v2', chunk, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/octet-stream',
                        'Dropbox-API-Arg': JSON.stringify({
                            'cursor': { 'session_id': sessionId, 'offset': cursor },
                            'close': chunkIndex === totalChunks - 1
                        })
                    }
                }
            )

            cursor += chunkSize
            chunkIndex++
        }

        // Concluir sessão de upload
        await axios.post(
            'https://content.dropboxapi.com/2/files/upload_session/finish', '', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/octet-stream',
                    'Dropbox-API-Arg': JSON.stringify({
                        'cursor': {'session_id': sessionId, 'offset': fileSize},
                        'commit': { 'path': `/${folderName}/${file.name}`, 'mode': 'add', 'autorename': true, 'mute': false }
                    })
                }
            }
        )

        return JSON.stringify({ ok: true, message: 'Arquivo carregado com sucesso!' })
    } catch (error) {
        throw new Error('Erro ao carregar arquivo')
    }
}

// Listagem de arquivos em pasta
export async function clientFileList(clientId) {
    const folderName = `client-${clientId}`

    try {
        const token = await getShortLiveToken()

        if (! await clientFolderExists(token, clientId)) {
            console.log('[DROPBOX] Criando pasta para cliente...')
            await createClientFolder(token, clientId)
        }

        const reqBody = {
            include_deleted: false,
            include_has_explicit_shared_members: false,
            include_media_info: false,
            include_mounted_folders: true,
            include_non_downloadable_files: true,
            path: `/${folderName}`,
            recursive: false
        }

        const result = await axios.post(
            'https://api.dropboxapi.com/2/files/list_folder',
            JSON.stringify(reqBody),
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        )

        const res = {files: result.data.entries}

        return JSON.stringify(res)
    } catch (error) {
        throw new Error("Erro ao listar arquivos de cliente")
    }
}

// Criação de pastas para clientes
export async function createClientFolder(token, clientId) {
    const folderName = `client-${clientId}`

    try {
        const reqBody = {
            autorename: false,
            path: `/${folderName}`
        }

        const res = await axios.post(
            'https://api.dropboxapi.com/2/files/create_folder_v2',
            JSON.stringify(reqBody),
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        )

        return JSON.stringify(res.data)
    } catch (error) {
        throw new Error("Erro ao criar pasta")
    }
}

// Verificão de existência de uma pasta
export async function clientFolderExists(token, clientId) {
    const folderName = `client-${clientId}`

    try {
        const reqBody = {
            include_deleted: false,
            include_has_explicit_shared_members: false,
            include_media_info: false,
            path: `/${folderName}`
        }

        await axios.post(
            'https://api.dropboxapi.com/2/files/get_metadata',
            JSON.stringify(reqBody),
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        )

        return true
    } catch (error) {
        console.log(`[DROPBOX] Pasta ${folderName} não encontrada`)
        return false
    }
}

// Pegar shot-live token
async function getShortLiveToken() {
    try {
        const params = new URLSearchParams()

        params.append('grant_type', 'refresh_token')
        params.append('refresh_token', DROPBOX_REFRESH_TOKEN)
        params.append('client_id', DROPBOX_APP_ID)
        params.append('client_secret', DROPBOX_APP_SECRET)

        const res = await axios.post(
            'https://api.dropbox.com/oauth2/token',
            params
        )

        return res.data.access_token
    } catch (error) {
        console.log(`Erro ao pegar short-live token: ${error}`)
        throw new Error(error)
    }
}
