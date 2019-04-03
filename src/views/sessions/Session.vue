<template>
  <div class="animated fade-in">
    <b-row>
      <b-col sm="12">
        <b-card>
          <div slot="header">
            <b-form>
              <strong>{{ caption }}</strong><small> ID:{{$route.params.idsession }}</small>
              <small class="float-right text-muted">
                2019/01/09 11:12:06 - Vigente
              </small>
              <b-row class="mt-3">
                <b-col sm="4">
                  <b-form-group>
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text><i class="fa fa-user"></i></b-input-group-text>
                      </b-input-group-prepend>
                      <b-form-input type="text" id="name" :disabled="true" v-model="userName" placeholder="Nombre">{{ userName }}</b-form-input>
                    </b-input-group>
                  </b-form-group>
                </b-col>
                <b-col sm="4">
                  <b-form-group>
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text><i class="fa fa-sitemap" ></i></b-input-group-text>
                      </b-input-group-prepend>
                      <b-form-input type="text" id="sessionDepartmentName" :disabled="true" v-model="sessionDepartmentName" placeholder="Departamento"></b-form-input>
                    </b-input-group>
                  </b-form-group>
                </b-col>
                <b-col sm="4">
                  <b-form-group>
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text><i class="fa fa-building"></i></b-input-group-text>
                      </b-input-group-prepend>
                      <b-form-input type="text" id="sessionLocationName" :disabled="true" v-model="sessionLocationName" placeholder="Ubicación"></b-form-input>
                    </b-input-group>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <div class="pull-right">
                    <b-button v-show="!addSessionVar" type="reset" size="sm" variant="danger" @click="goBack" class="mr-1"><i class="fa fa-ban"></i> Cancelar</b-button>
                    <b-button v-show="!addSessionVar" type="button" size="sm" variant="primary" @click="addSessionClicked" :disabled="!formValidated"><i class="fa fa-play"></i> Iniciar</b-button>
                  </div>
                </b-col>
              </b-row>
            </b-form>
          </div>

          <b-row>
            <b-col>
              <div class="text-center mb-4">
                <b-button v-show="addSessionVar" type="button" size="lg" variant="primary" @click="scanModal = true" ><i class="fa fa-barcode"></i> ESCANEAR </b-button>
              </div>
            </b-col>
            <b-col>
              <div class="text-center mb-4">
                <b-button v-show="addSessionVar" type="button" size="lg" variant="primary" @click="addModalFlag = true; scanBarcode = true; scanModal = true; statusID = 9; statusName = 'EN DEMASÌA'" ><i class="fa fa-cube"></i> AGREGAR SIN ETIQUETA </b-button>
              </div>
            </b-col>
          </b-row>

          <b-table v-show="addSessionVar" :hover="hover" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" responsive="lg" :items="tableitems" :fields="tablefields" :current-page="currentPage" :per-page="perPage" @row-clicked="rowClicked">
            <template slot="id" slot-scope="data">
              {{data.item.id}}
            </template>
            <template slot="keyfield" slot-scope="data">
              {{data.item.keyField}}
            </template>
            <template slot="status" slot-scope="data">
              <b-badge :variant="getBadge(data.item.statusID)">{{data.item.statusID}}</b-badge>
            </template>
          </b-table>
          <nav>
            <b-pagination v-show="addSessionVar" size="sm" :total-rows="getRowCount(tableitems)" :per-page="perPage" v-model="currentPage" prev-text="Ant" next-text="Sig" hide-goto-end-buttons/>
          </nav>

          <div slot="footer" v-show="addSessionVar">
            <div class="pull-right">
              <b-button type="reset" size="sm" variant="secondary" @click="goBack" class="mr-1"><i class="fa fa-chevron-left"></i> Atras</b-button>
              <b-button v-show="addSessionVar" type="button" size="sm" variant="primary" @click="closeSession" :disabled="!formValidated"><i class="fa fa-stop"></i> Terminar</b-button>
            </div>
          </div>
        </b-card>
      </b-col>
    </b-row>

    <!--MODAL-->
    <b-modal  :title="titleMod" v-model="scanModal" @ok="saveAsset" ok-variant="primary" @cancel="cancelScan" cancel-title="Cancelar" ok-title="Guardar" ref="scanModal" @hide="cancelScan">
      <div>
        <b-row>
          <b-col>
            <div class="text-center mb-4">
              <b-button v-show="!scanBarcode" type="button" variant="primary" @click="scaner" ><i class="fa fa-camera"></i> Cámara para scanear código de barras </b-button>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-input-group v-show="!scanBarcode">
              <b-input-group-prepend>
                <b-input-group-text><i class="fa fa-barcode" ></i></b-input-group-text>
              </b-input-group-prepend>
              <b-form-input type="text" id="keyfield"  placeholder="Introduce la clave"></b-form-input>
              <b-button type="button" variant="primary" @click="scaner" ><i class="fa fa-search"></i> Buscar </b-button>
            </b-input-group>
          </b-col>
        </b-row>
        <b-row v-show="scanBarcode">
          <b-col lg="12">
            <b-card>
              <div slot="header">
                <label class="small muted" for="keyfield">Estatus</label>
                <strong> {{statusName}} </strong>
                <small class="float-right text-muted">
                  ID Sesión: {{ sessionID }}
                </small>
              </div>
              <b-form>
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-barcode" ></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input type="text" id="keyfield" v-model="$v.keyField.$model" :disabled="true" placeholder="Introduce la clave"></b-form-input>
                  </b-input-group>
                </b-form-group>
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-cube" ></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input type="text" id="asset" :class="{ 'form-group--error': $v.asset.$error }" v-model="$v.asset.$model" placeholder="Introduce el activo"></b-form-input>
                  </b-input-group>
                  <div class="small text-danger" v-if="!$v.asset.required">Campo requerido</div>
                </b-form-group>
                <b-form-group>
                  <label class="small muted" for="description">Descripción</label>
                  <b-form-input type="text" id="description" v-model="$v.description.$model" placeholder="Introduce la descripción"></b-form-input>
                  <div class="small text-danger" v-if="!$v.description.required">Campo requerido</div>
                </b-form-group>
                <b-row>
                  <b-col sm="6">
                    <b-form-group>
                      <label class="small muted" for="brand">Marca</label>
                      <b-form-input type="text" id="brand" v-model="$v.brand.$model" placeholder="Introduce la marca"></b-form-input>
                      <div class="small text-danger" v-if="!$v.brand.required">Campo requerido</div>
                    </b-form-group>
                  </b-col>
                  <b-col sm="6">
                    <b-form-group>
                      <label class="small muted" for="model">Modelo</label>
                      <b-form-input type="text" id="model" v-model="$v.model.$model" placeholder="Introduce el modelo"></b-form-input>
                      <div class="small text-danger" v-if="!$v.model.required">Campo requerido</div>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col sm="6">
                    <b-form-group>
                      <label class="small muted" for="serial">Serie</label>
                      <b-form-input type="text" id="brand" v-model="$v.serial.$model" placeholder="Introduce el número de serie"></b-form-input>
                      <div class="small text-danger" v-if="!$v.serial.required">Campo requerido</div>
                    </b-form-group>
                  </b-col>
                  <b-col sm="6">
                    <b-form-group>
                      <label class="small muted" for="cost">Costo</label>
                      <b-form-input type="text" id="cost" v-model="$v.cost.$model" placeholder="Introduce el costo"></b-form-input>
                      <div class="small text-danger" v-if="!$v.cost.required">Campo requerido</div>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <b-form-group>
                      <label class="small muted" for="assetType">Tipo de activo</label>
                      <b-form-select id="assetType" v-model="$v.assetType.$model"
                                     :options="assetTypeOptions">
                      </b-form-select>
                      <div class="small text-danger" v-if="!$v.assetType.required">Campo requerido</div>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-id-card"></i></b-input-group-text>
                      <treeselect  :multiple="false" :options="options" id="departmentIDSel"  @input="changeDep" v-model="$v.departmentIDsel.$model" required/>
                    </b-input-group-prepend>
                  </b-input-group>
                </b-form-group>
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-building"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-select id="sessionLocation"
                                   v-model="$v.locationIDsel.$model"
                                   class="form-control" :class="{ 'is-invalid': locationValidationError }"
                                   @change="changeLoc"
                                   :options="locationOptions">
                    </b-form-select>
                  </b-input-group>
                  <div class="small text-danger" v-if="!locationValidationRequired">Campo requerido</div>
                </b-form-group>
                <b-form-group>
                  <label class="small muted" for="locationDetail">Detalles de la ubicación</label>
                  <b-form-input type="text" id="locationDetail" v-model="$v.locationDetail.$model" placeholder="Introduce el detalle de la ubicación"></b-form-input>
                </b-form-group>
                <b-form-group>
                  <label class="small muted" for="comments">Comentarios</label>
                  <b-form-input type="text" id="comments" v-model="$v.comments.$model" placeholder="Introduce comentarios adicionales"></b-form-input>
                </b-form-group>
              </b-form>
            </b-card>
          </b-col>

          <b-col lg="12">
            <b-card
              header-tag="header"
              footer-tag="footer">
              <div slot="header">
                <i class="fa fa-align-justify"></i><strong> Imágenes del activo</strong>
                <div class="card-header-actions">
                  <b-button type="button" variant="primary" class="float-right" size="sm" id="imagesButton" @click="selImages"><i class="fa fa-plus"></i>
                    </b-button>
                  <input
                    id="inputfile"
                    type="file"
                    multiple
                    accept="image/png, image/jpeg"
                    name="attachment" style="display: none"
                  @change="updateCarousel">
                </div>
              </div>
              <div id="carouselContainer">
                <b-carousel id="carousel1"
                            style="text-shadow: 1px 1px 2px #333;"
                            indicators
                            background="#ababab"
                            :interval="0"
                            img-width="1024"
                            img-height="768"
                            v-model="slide"
                            @sliding-start="onSlideStart"
                            @sliding-end="onSlideEnd"
                >
                </b-carousel>
              </div>
            </b-card>
          </b-col>
        </b-row>
      </div>
    </b-modal>

    <!--MODAL-->
    <b-modal title="Agregar activo sin etiqueta" v-model="addModal" @ok="addAsset" ok-variant="primary" cancel-title="Cancelar" ok-title="Guardar" ref="addModal" @hide="cancelAdd">
      <div>
        <b-row>
          <b-col lg="12">
            <b-card>
              <div slot="header">
                <label class="small muted" for="keyfield">Estatus</label>
                <strong> {{nuevo.status}} </strong>
                <small class="float-right text-muted">
                  ID Sesión: {{ sessionID }}
                </small>
              </div>
              <b-form>
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-barcode" ></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input type="text" id="keyfield" v-model="nuevo.keyfield" :disabled="true" placeholder="Sin clave"></b-form-input>
                  </b-input-group>
                  <div class="small text-danger" v-if="!departmentValidationRequired">Campo requerido</div>
                </b-form-group>
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-cube" ></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input type="text" id="asset" v-model="nuevo.asset" placeholder="Introduce el activo"></b-form-input>
                  </b-input-group>
                  <div class="small text-danger" v-if="!departmentValidationRequired">Campo requerido</div>
                </b-form-group>
                <b-form-group>
                  <label class="small muted" for="description">Descripción</label>
                  <b-form-input type="text" id="description" v-model="nuevo.description" placeholder="Introduce la descripción"></b-form-input>
                </b-form-group>
                <b-row>
                  <b-col sm="6">
                    <b-form-group>
                      <label class="small muted" for="brand">Marca</label>
                      <b-form-input type="text" id="brand" v-model="nuevo.brand" placeholder="Introduce la marca"></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col sm="6">
                    <b-form-group>
                      <label class="small muted" for="model">Modelo</label>
                      <b-form-input type="text" id="model" v-model="nuevo.model" placeholder="Introduce el modelo"></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col sm="6">
                    <b-form-group>
                      <label class="small muted" for="serial">Serie</label>
                      <b-form-input type="text" id="brand" v-model="nuevo.serial" placeholder="Introduce el número de serie"></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col sm="6">
                    <b-form-group>
                      <label class="small muted" for="cost">Costo</label>
                      <b-form-input type="text" id="cost" v-model="nuevo.cost" placeholder="Introduce el costo"></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <b-form-group>
                      <label class="small muted" for="assetType">Tipo de activo</label>
                      <b-form-select id="assetType" v-model="nuevo.assetType"
                                     :options="assetTypeOptions">
                      </b-form-select>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-id-card"></i></b-input-group-text>
                      <treeselect  :multiple="false" :options="options" id="departmentID"   required/>
                    </b-input-group-prepend>
                  </b-input-group>
                </b-form-group>
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-building"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-select id="sessionLocation"
                                   v-model="nuevo.location"
                                   class="form-control" :class="{ 'is-invalid': locationValidationError }"
                                   :options="locationOptions">
                    </b-form-select>
                  </b-input-group>
                  <div class="small text-danger" v-if="!locationValidationRequired">Campo requerido</div>
                </b-form-group>
                <b-form-group>
                  <label class="small muted" for="locationDetail">Detalles de la ubicación</label>
                  <b-form-input type="text" id="locationDetail" v-model="nuevo.locationDetail" placeholder="Introduce el detalle de la ubicación"></b-form-input>
                </b-form-group>
                <b-form-group>
                  <label class="small muted" for="comments">Comentarios</label>
                  <b-form-input type="text" id="comments" v-model="nuevo.comments" placeholder="Introduce comentarios adicionales"></b-form-input>
                </b-form-group>
              </b-form>
            </b-card>
          </b-col>

          <b-col lg="12">
            <b-card
              header-tag="header"
              footer-tag="footer">
              <div slot="header">
                <i class="fa fa-align-justify"></i><strong> Imágenes del activo</strong>
                <div class="card-header-actions">
                  <b-button type="button" variant="primary" class="float-right" size="sm"><i class="fa fa-plus"></i></b-button>
                </div>
              </div>
              <div>
                <b-carousel id="carousel1"
                            style="text-shadow: 1px 1px 2px #333;"
                            indicators
                            background="#ababab"
                            :interval="0"
                            img-width="1024"
                            img-height="768"
                            v-model="slide"
                            @sliding-start="onSlideStart"
                            @sliding-end="onSlideEnd"
                >

                  <!-- Text slides with image -->
                </b-carousel>

                <p class="small muted mt-4">
                  Imagen: {{ slide }}
                </p>

              </div>
            </b-card>
          </b-col>
        </b-row>
      </div>
    </b-modal>

    <!--MODAL-->
       <b-modal title="Detalle de activo" v-model="assetModal" ok-only ok-variant="secondary" ok-title="Cerrar">
      <div>
        <b-row>
          <b-col lg="12">
            <b-card>
              <div slot="header">
                <strong> Activo</strong>
                <small> ID: {{ current.id }} </small>
                <small class="float-right text-muted">
                  ID Sesión: {{ sessionID }}
                </small>
              </div>
              <b-form>
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-barcode" ></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input type="text" id="keyfield" v-model="current.keyField" :disabled="true"></b-form-input>
                  </b-input-group>
                </b-form-group>
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-cube" ></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input type="text" id="asset" v-model="current.asset" :disabled="true"></b-form-input>
                  </b-input-group>
                </b-form-group>
                <b-form-group>
                  <label class="small muted" for="description">Descripción</label>
                  <b-form-input type="text" id="description" v-model="current.description" :disabled="true"></b-form-input>
                </b-form-group>
                <b-row>
                  <b-col sm="6">
                    <b-form-group>
                      <label class="small muted" for="brand">Marca</label>
                      <b-form-input type="text" id="brand" v-model="current.brand" :disabled="true"></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col sm="6">
                    <b-form-group>
                      <label class="small muted" for="model">Modelo</label>
                      <b-form-input type="text" id="model" v-model="current.model" :disabled="true"></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col sm="6">
                    <b-form-group>
                      <label class="small muted" for="serial">Serie</label>
                      <b-form-input type="text" id="brand" v-model="current.serial" :disabled="true"></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col sm="6">
                    <b-form-group>
                      <label class="small muted" for="cost">Costo</label>
                      <b-form-input type="text" id="cost" v-model="current.cost" :disabled="true"></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <b-form-group>
                      <label class="small muted" for="cost">Tipo de activo</label>
                      <b-form-input type="text" id="assetType" v-model="current.assetType" :disabled="true"></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-id-card"></i></b-input-group-text>
                      <treeselect  :multiple="false" :options="options" id="departmentID"  v-model="current.currentDepartmentID" disabled/>
                    </b-input-group-prepend>
                  </b-input-group>
                </b-form-group>
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-building"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-select id="location"
                                   v-model="current.locationID"
                                   class="form-control"
                                   :disabled="true"
                                   :options="locationOptions">
                    </b-form-select>
                  </b-input-group>
                </b-form-group>
                <b-form-group>
                  <label class="small muted" for="locationDetail">Detalles de la ubicación</label>
                  <b-form-input type="text" id="locationDetail" v-model="current.locationDetail" :disabled="true"></b-form-input>
                </b-form-group>
                <b-form-group>
                  <label class="small muted" for="comments">Comentarios</label>
                  <b-form-input type="text" id="comments" v-model="current.comments" :disabled="true"></b-form-input>
                </b-form-group>
              </b-form>
            </b-card>
          </b-col>

          <b-col lg="12">
            <b-card
              header-tag="header"
              footer-tag="footer">
              <div slot="header">
                <i class="fa fa-align-justify"></i><strong> Imágenes del activo</strong>
                <div class="card-header-actions">
                  <b-button type="button" variant="primary" class="float-right" size="sm"><i class="fa fa-cloud-download"></i></b-button>
                </div>
              </div>
              <div>
                <b-carousel id="carouselCurrent"
                            style="text-shadow: 1px 1px 2px #333;"
                            indicators
                            background="#ababab"
                            :interval="0"
                            img-width="1024"
                            img-height="768"
                            v-model="slide"
                            @sliding-start="onSlideStart"
                            @sliding-end="onSlideEnd"
                >

                </b-carousel>

                <p class="small muted mt-4">
                  Imagen: {{ slide + 1 }}
                </p>

              </div>
            </b-card>
          </b-col>
        </b-row>
      </div>
    </b-modal>

  </div>

</template>

<script>
  import sessionsData from './SessionsData'
  import assetsData from './AssetsData'
  import getById from '../../services/GetCatalogById'
  import gets from '../../services/Gets'
  import posts from '../../services/Posts'
  import S3 from '../../s3/config'
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import createCatalog from '../../services/CreateCatalogService'
  import { required, minLength } from 'vuelidate/lib/validators'
  export default {
    name: 'AddSession',
    props: {
      caption: {
        type: String,
        default: 'Sesión de registro'
      },
      hover: {
        type: Boolean,
        default: true
      },
      striped: {
        type: Boolean,
        default: false
      },
      bordered: {
        type: Boolean,
        default: false
      },
      small: {
        type: Boolean,
        default: false
      },
      fixed: {
        type: Boolean,
        default: false
      }
    },
    data: () => {
      return {
        scanModal: false,   //Modal para escanear
        addModal: false,    //Modal para agregar sin etiqueta
        assetModal: false,  //Modal para detalle de activo
        itemSelected: 0,
        sessionID: null,
        slide: 0,
        addModalFlag: false,
        userName: null,
        addSessionVar: false,
        scanBarcode: false,
        department: null,
        options: [],
        location: null,
        keyField:null,
        asset:null,
        description:null,
        brand:null,
        model:null,
        serial:null,
        cost:null,
        assetType:null,
        departmentIDsel:null,
        departmentID:null,
        locationID:null,
        locationIDsel:null,
        locationDetail:null,
        statusName:null,
        comments:null,
        sameDep:null,
        sameLoc:null,
        locationOptions: [],
        assetTypeOptions: [
          {value: null, text: 'Tipo de activo...'},
          {value: 'Mobiliario', text: 'Mobiliario'},
          {value: 'Equipo', text: 'Equipo'},
          {value: 'Maquinaria', text: 'Maquinaria'},
          {value: 'Instrumental', text: 'Instrumental'},
          {value: 'Vehículo', text: 'Vehículo'},
          {value: 'Inmueble', text: 'Inmueble'},
          {value: 'Terreno', text: 'Terreno'},
          {value: 'Bien natural', text: 'Bien natural'},
          {value: 'Otro', text: 'Otro'}
        ],
        items: (id) => {
          const session = sessionsData.find( session => session.id.toString() === id)
          return session
        },
        fields: [
          {label: 'ID', key: 'id', sortable: true},
          {label: 'Inicio', key: 'creationDateTime', sortable: true},
          {label: 'Fin', key: 'finalDateTime', sortable: true},
          {label: 'Usuario', key: 'userName', sortable: true},
          {label: 'Departamento', key: 'sessionDepartmentName', sortable: true},
          {label: 'Ubicación', key: 'sessionLocationName', sortable: true},
          {label: 'Estatus', key: 'status', sortable: true}
        ],
        find: {
          id: null, keyfield: '', asset: '', description: '', brand: '', model: '', serial:'', cost: '', assetType: '', locationDetail: '', comments: '', status: ''
        },
        nuevo: {
          id: 0, keyfield: '', asset: '', description: '', brand: '', model: '', serial:'', cost: '', assetType: '', locationDetail: '', comments: '', status: 'En demasía'
        },
        current: {
          id: 0, keyfield: '', asset: '', description: '', brand: '', model: '', serial:'', cost: '', assetType: '', locationDetail: '', comments: '', status: ''
        },
        tableitems:  [],
        tablefields: [
          {label: 'ID', key: 'id', sortable: true},
          {label: 'Clave', key: 'keyField', sortable: true},
          {label: 'Activo', key: 'asset', sortable: true},
          {label: 'Descripción', key: 'description', sortable: true},
          {label: 'Costo', key: 'cost', sortable: true},
          {label: 'Tipo', key: 'assetType', sortable: true},
          {label: 'Estatus', key: 'statusID', sortable: true}
        ],
        currentPage: 1,
        perPage: 5,
        totalRows: 0
      }
    },
    components: {
      Treeselect
    },
    validations: {
      departmentID: {

      },keyField: {
        required
      },asset: {
        required
      },description: {
        required
      },brand: {
        required
      },model: {
        required
      },serial: {
        required
      },cost: {
        required
      },assetType: {
        required
      },departmentIDsel: {

      },locationIDsel: {
        required
      },locationDetail: {

      },comments: {

      }
    },
    beforeCreate: function () {
      if (!this.$session.exists()) {
        this.$router.push('/pages/login')
      }
    },
    async mounted() {
      const dprtmnts = await gets.getDepartmentsByCompany(this.$session.get('companyID'));
      this.options = dprtmnts.data.departments;
      const lctns = await gets.getLocationsByCompany(this.$session.get('companyID'));
      let tmp2 = [
        {value: null, text: 'Ubicaciones...'}
      ];
      lctns.data.locations.map(function(value, key) {
        let dt = {value: value.id, text: value.name};
        tmp2.push(dt);
      });
      this.locationOptions = tmp2;
      const ssn = await getById.getRegistrationSessionById(this.$route.params.idsession);
      console.info(ssn);
      this.userName = this.$session.get('name');
      this.locationID = ssn.data.registrationSession.sessionLocationId;
      this.sessionLocationName = ssn.data.registrationSession.locationName;
      this.sessionDepartmentName = ssn.data.registrationSession.departmentName;
      this.departmentID = ssn.data.registrationSession.sessionDepartmentID;
      this.addSessionVar = true
      const assets = await gets.getFinalAssetsBySession(this.$route.params.idsession);
      this.tableitems = assets.data.finalAssets;
      console.info(assets.data.finalAssets)
    },
    computed:{
      titleMod : function() {
        return this.addModalFlag == true ? 'Agregar activo sin etiqueta' : 'Escanear activo'
      }
    },
    methods: {
      changeDep(){
        if (this.departmentIDsel === this.departmentID){
          this.sameDep = true;
        }else{
          this.sameDep = false;
        }
        this.updateStatus();
      },
      changeLoc(){
        if (this.locationIDsel === this.locationID){
          this.sameLoc = true;
        }else{
          this.sameLoc = false;
        }
        this.updateStatus();
      },
      async saveAsset(){
        const nwAsst = {
          "projectID": this.$session.get('projectID'),
          "registrationSessionID": this.$session.get('activeSessionID'),
          "lastRegistration": false,
          "keyField": document.getElementById('keyfield').value,
          "asset": this.asset,
          "assetType": this.assetType,
          "description": this.description,
          "brand": this.brand,
          "model": this.model,
          "serial": this.serial,
          "acquisitionDate": '0000-00-00',
          "acquisitionType": '',
          "invoice": '',
          "price": '0.0',
          "tax": '0.0',
          "cost": "" + this.cost,
          "currentValue": '0.0',
          "accountingDepreciation": '0.0',
          "fiscalDepreciation": '0.0',
          "lastDepartmentID": 0,
          "currentDepartmentID": this.departmentIDsel,
          "costCenterID": 0,
          "acountingAccountID": 0,
          "locationID": this.locationIDsel,
          "locationDetail": this.locationDetail,
          "comments": this.comments,
          "personalString01": '',
          "personalString02": '',
          "personalString03": '',
          "personalString04": '',
          "personalString05": '',
          "personalInt01": 0,
          "personalInt02": 0,
          "personalInt03": 0,
          "personalFloat01": '0.0',
          "personalFloat02": '0.0',
          "personalFloat03": '0.0',
          "statusID": this.statusID,
          "userId": this.$session.get('userId')
        };
        await createCatalog.createFinalAsset(nwAsst).then(async response => {
          console.info(response);
          if (response.data.error.errorCode === 0){
            let s3Cli = new S3();
            let files = document.getElementById('inputfile').files;
            for (var i = 0; i < files.length; i++){
              this.assetID = response.data.id;
              var self = this;
              let key = 'projects/'+this.$session.get('projectID')+'/assets/'+response.data.id+'/assetFile_'+ (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)) + '.' + files[i].name.substr((files[i].name.lastIndexOf('.') + 1));
              await s3Cli.uploadAssetFile(files[i],key, async function (err, data) {
                console.info(data)
                const fl = {
                  "mime": data.Location.substr(data.Location.lastIndexOf('.') + 1),
                  "url": data.Location,
                  "statusID": 2,
                  "userId": self.$session.get('userId')
                };
                await createCatalog.createFile(fl).then(async response => {
                  console.info(response);
                  if (response.data.error.errorCode === 0){
                    const asstFl = {
                      "isFinal": true,
                      "assetID": self.assetID,
                      "fileID": response.data.id,
                      "statusID": 2
                    };
                    await createCatalog.createAssetFile(asstFl).then(async response => {
                      console.info(response);
                      /*if (response.data.error.errorCode === 0){

                      }else{
                        this.$toaster.error(response.data.error.message);
                        this.submitStatus = 'ERROR';
                      }*/
                    });
                  }else{
                    this.$toaster.error(response.data.error.message);
                    this.submitStatus = 'ERROR';
                  }
                });
              });
        }
          }else{
            this.$toaster.error(response.data.error.message);
            this.submitStatus = 'ERROR';
          }
          alert("Finished :V")
        });



        //this.scanBarcode = false
      },
      selImages(){
        let clickEvent = document.createEvent('MouseEvents');
        clickEvent.initMouseEvent('click', true, true, window,
          0, 0, 0, 0, 0, false, false, false, false, 0, null);
        document.querySelector('#inputfile').dispatchEvent(clickEvent);
      },
      updateCarousel(e){
        alert("selected files: " + e.target.files.length)
        var div = document.createElement('div');

        for (let i = 0; i < e.target.files.length; i++){
          const file = e.target.files[i];
          //div.innerHTML = '<b-carousel-slide img-src="'+ URL.createObjectURL(file) +'"></b-carousel-slide>'
          div.innerHTML = '<div data-v-19bfb51e role="listitem" class="carousel-item" aria-current="false" aria-posinset="1" aria-setsize="3" style="background: rgb(171, 171, 171);" aria-hidden="true">' +
            '<img src="' + URL.createObjectURL(file) + '" width="1024" height="768" class="img-fluid w-100 d-block">' +
            '<div class="carousel-caption"><!----><!----></div>' +
            '</div>'
          const element = div.firstChild;
          document.querySelector('#carousel1___BV_inner_').appendChild(element);
        }

        //
      },
      goBack() {
        this.$router.go(-1)
      },
      getBadge (status) {
        return status === 'Conciliado' ? 'success'
          : status === 'Cambio de despartamento' ? 'primary'
            : status === 'Cambio de ubicación' ? 'primary'
              : status === 'Cambio de activo' ? 'primary'
                : status === 'En demasía' ? 'warning'
                  : status === 'No inventariado' ? 'danger' : 'primary'
      },
      getRowCount (item) {
        return item.length
      },
      regLink (idsession,id) {
        return `session/sessionID/asset/${id.toString()}`
      },
      async rowClicked (item) {
        this.current = item;
        this.assetModal = true;
        console.info(item);
        const images = await gets.getImagesByAsset(this.current.id,true);
        console.info(images)
        var div = document.createElement('div');
        document.querySelector('#carouselCurrent___BV_inner_').innerHTML = '';
        for (let i = 0; i < images.data.files.length; i++){
          const file = images.data.files[i];
          //div.innerHTML = '<b-carousel-slide img-src="'+ URL.createObjectURL(file) +'"></b-carousel-slide>'
          div.innerHTML = '<div data-v-19bfb51e role="listitem" class="carousel-item" aria-current="false" aria-posinset="1" aria-setsize="3" style="background: rgb(171, 171, 171);" aria-hidden="true">' +
            '<img src="' + images.data.files[i].url + '" width="1024" height="768" class="img-fluid w-100 d-block">' +
            '<div class="carousel-caption"><!----><!----></div>' +
            '</div>'
          const element = div.firstChild;
          document.querySelector('#carouselCurrent___BV_inner_').appendChild(element);
        }
        /*this.itemSelected = item.id - 1
        this.current = this.tableitems[this.itemSelected]
        console.info(this.current)
        this.assetModal = true*/

      },
      addSessionClicked () {
        this.addSessionVar = true
        this.find.department = this.department
        this.find.location = this.location
        this.nuevo.department = this.department
        this.nuevo.location = this.location
      },
      async scaner () {
       let assetFound = await gets.getAssetByKeyField(this.$session.get('projectID'),document.getElementById('keyfield').value);
       console.info(assetFound);
       if (assetFound.data.error.errorCode == 0){//  id: null, keyfield: '', asset: '', description: '', brand: '', model: '', serial:'', cost: '', assetType: '', locationDetail: '', comments: '', status: ''
        this.keyField = assetFound.data.asset.keyField;
        this.sessionID = this.$route.params.idsession;
        this.asset = assetFound.data.asset.asset;
        this.description = assetFound.data.asset.description;
        this.brand = assetFound.data.asset.brand;
        this.cost = assetFound.data.asset.cost;
        this.model = assetFound.data.asset.model;
        this.serial = assetFound.data.asset.serial;
        this.assetType = assetFound.data.asset.assetType;
        this.locationDetail = assetFound.data.asset.locationDetail;
        this.comments = assetFound.data.asset.comments;
        this.status = assetFound.data.asset.statusID;
        this.departmentIDsel = assetFound.data.asset.currentDepartmentID;
        this.locationIDsel = assetFound.data.asset.locationID;
         this.scanBarcode = true;
         if (this.departmentIDsel === this.departmentID){
           this.sameDep = true
         }else{
           this.sameDep = false
         }
         if(this.locationIDsel === this.locationID){
           this.sameLoc = true;
         }else{
           this.sameLoc = false;
         }
         this.updateStatus();
       }else{
         this.scanBarcode = true;
         this.statusID = 8;
         this.statusName = 'ETIQUETA SIN DATOS';
       }
      },
      updateStatus(){
        console.info('sessionDep: ' + this.departmentID + ' sessionLoc: ' + this.locationID + ' selectedDep: ' + this.departmentIDsel + ' selectedLoc: ' + this.locationIDsel)
        if (this.statusID < 8){
          if (this.sameDep === true === this.sameLoc){
            console.info("se concilia")
            this.statusID = 4;
            this.statusName = 'COINCILIADO';
          }else{
            if (!this.sameDep){
              console.info("cambia dep")
              this.statusID = 5;
              this.statusName = 'CAMBIO DE DEPARTAMENTO';
            }else{
              console.info("cambia ubicacion")
              this.statusID = 6;
              this.statusName = 'CAMBIO DE UBICACIÓN';
            }
          }
        }
      },
      scanAsset () {
        this.find.id = this.tableitems.length + 1
        this.tableitems.push(
          {
            id : this.find.id,
            keyfield : this.find.keyfield,
            asset : this.find.asset,
            description : this.find.description,
            brand : this.find.brand,
            model : this.find.model,
            serial : this.find.serial,
            cost : this.find.cost,
            assetType : this.find.assetType,
            department : this.find.department,
            location : this.find.location,
            locationDetail : this.find.locationDetail,
            comments : this.find.comments,
            status : this.find.status
          }
        )
        this.scanBarcode = false
      },
      addAsset () {
        this.nuevo.id = this.tableitems.length + 1
        this.tableitems.push(
          {
            id : this.nuevo.id,
            asset : this.nuevo.asset,
            description : this.nuevo.description,
            brand : this.nuevo.brand,
            model : this.nuevo.model,
            serial : this.nuevo.serial,
            cost : this.nuevo.cost,
            assetType : this.nuevo.assetType,
            department : this.nuevo.department,
            location : this.nuevo.location,
            locationDetail : this.nuevo.locationDetail,
            comments : this.nuevo.comments,
            status : this.nuevo.status
          }
        )
        this.scanBarcode = false
        this.nuevo.id = '',
          this.nuevo.asset = '',
          this.nuevo.description = '',
          this.nuevo.brand = '',
          this.nuevo.model = '',
          this.nuevo.serial = '',
          this.nuevo.cost = '',
          this.nuevo.assetType = '',
          this.nuevo.department = this.department,
          this.nuevo.location = this.location,
          this.nuevo.locationDetail = '',
          this.nuevo.comments = '',
          this.nuevo.status = 'En demasía'
      },
      cancelScan () {
        this.scanBarcode = false
      },
      cancelAdd () {

      },
      closeSession () {

      },
      onSlideStart (slide) {
        console.log('onSlideStart', slide)
        this.sliding = true
      },
      onSlideEnd (slide) {
        console.log('onSlideEnd', slide)
        this.sliding = false
      }
    }
  }
</script>

<style scoped>
  .card-body >>> table > tbody > tr > td {
    cursor: pointer;
  }
</style>
